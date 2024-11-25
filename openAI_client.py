import openai
from openai import OpenAI, APIConnectionError, RateLimitError, AuthenticationError
from openai.resources.chat import completions
from typing import *


# For more info on openai module see: https://github.com/openai/openai-python

MODEL_DESCRIPTIONS = {
    "gpt-4-1106-preview": "Preview version of GPT-4 with updates and experimental features released on November 6, 2024.",
    "gpt-4": "Flagship language model by OpenAI, known for advanced natural language understanding and generation.",
    "o1-preview-2024-09-12": "Preview of an experimental 'O1' series model focusing on optimized performance and efficiency.",
    "o1-mini-2024-09-12": "A smaller version of the 'O1' series model released for lightweight tasks and lower resource usage.",
    "gpt-4o-2024-11-20": "Enhanced variant of GPT-4 optimized for performance and released on November 20, 2024.",
    "dall-e-2": "Second-generation DALL·E model for generating high-quality images from textual descriptions.",
    "chatgpt-4o-latest": "Latest variant of GPT-4o designed for conversational tasks with enhanced capabilities.",
    "gpt-3.5-turbo": "A faster, cost-efficient version of GPT-3.5 designed for general-purpose language tasks.",
    "gpt-3.5-turbo-0125": "Specific variant of GPT-3.5-turbo released on January 25, optimized for refined performance.",
    "babbage-002": "Small-scale model optimized for specific tasks like text classification and embeddings.",
    "gpt-4-turbo-2024-04-09": "Turbo variant of GPT-4 focusing on speed and efficiency, released in April 2024.",
    "davinci-002": "Advanced version of OpenAI's older 'Davinci' model, optimized for high-complexity tasks.",
    "dall-e-3": "Third-generation image generation model with improved realism and fidelity.",
    "o1-mini": "Compact version of the 'O1' series designed for efficiency and smaller-scale applications.",
    "gpt-3.5-turbo-16k-0613": "GPT-3.5-turbo variant with extended context support (16k tokens) released on June 13.",
    "text-embedding-3-large": "Model optimized for creating high-quality embeddings for larger-scale datasets.",
    "gpt-3.5-turbo-16k": "GPT-3.5-turbo variant with extended context length of 16k tokens.",
    "o1-preview": "General preview of the 'O1' series models focused on optimized processing.",
    "gpt-4o-realtime-preview": "Preview of a real-time optimized GPT-4o for faster response times.",
    "tts-1-hd-1106": "High-definition Text-to-Speech model released on November 6, 2024.",
    "gpt-4o-realtime-preview-2024-10-01": "Updated real-time preview of GPT-4o released in October 2024.",
    "gpt-4o-mini": "A compact version of GPT-4o designed for lightweight applications.",
    "gpt-4-turbo-preview": "Preview version of the GPT-4 Turbo model for faster processing and testing new features.",
    "gpt-4-turbo": "Performance-optimized version of GPT-4 designed for speed and cost-efficiency.",
    "text-embedding-ada-002": "Efficient model for generating embeddings, optimized for smaller tasks.",
    "gpt-4-0613": "Specific release of GPT-4 with updates as of June 13.",
    "gpt-4o-mini-2024-07-18": "Compact version of GPT-4o released in July 2024, optimized for smaller tasks.",
    "text-embedding-3-small": "Smaller-scale embedding model ideal for lightweight applications.",
    "gpt-4o-2024-08-06": "GPT-4o release optimized for performance and updates as of August 6, 2024.",
    "tts-1-hd": "High-definition Text-to-Speech model for generating realistic audio.",
    "gpt-4o": "Optimized variant of GPT-4 focused on faster, cost-efficient operations.",
    "gpt-3.5-turbo-1106": "GPT-3.5-turbo variant with updates as of November 6, 2024.",
    "gpt-3.5-turbo-instruct": "Instruction-tuned version of GPT-3.5-turbo for better adherence to directives.",
    "gpt-4o-audio-preview": "Preview of GPT-4o extended to handle audio-related tasks.",
    "gpt-3.5-turbo-0613": "GPT-3.5-turbo variant updated as of June 13.",
    "whisper-1": "Speech-to-text model optimized for transcribing audio into text.",
    "gpt-4o-audio-preview-2024-10-01": "Updated preview of GPT-4o with audio processing capabilities released in October 2024.",
    "gpt-4-0125-preview": "Preview version of GPT-4 released on January 25 with experimental features.",
    "tts-1": "Text-to-Speech model for generating synthetic speech.",
    "tts-1-1106": "Updated version of TTS-1 released on November 6, 2024.",
    "gpt-3.5-turbo-instruct-0914": "Instruction-tuned GPT-3.5-turbo variant released on September 14, 2024.",
    "gpt-4o-2024-05-13": "GPT-4o release with performance optimizations as of May 13, 2024."
}



class OpenAIClient:
    def __init__(self):
        with open("API_Key.txt", "r") as key_file:
            self.__api_key = key_file.readlines(1)[0].rstrip("\n")

        self.__client = OpenAI(api_key=self.__api_key)

        try:
            self.__client.models.list()  # tries getting a list of all the models the user has access to, in their key.

        except AuthenticationError:
            print("\033[31mInvalid API Key, ensure the key provided in API_Key.txt is correct.\033[0m")

        self.__tuning_parameters = {
            "temperature": 0.7,
            "stream": False,
            "response style": "You are a helpful assistant."
        }

        self.__model = ""
        self.__conversation = "New Chat.txt"  # if user selects a conversation or is in one, this will be set to that.

    @property
    def conversation(self) -> str:
        return self.__conversation

    @property
    def tuning_parameters(self) -> Dict[str, Any]:
        return self.__tuning_parameters

    @property
    def model(self) -> str:
        return self.__model

    @model.setter
    def model(self, new_model: str) -> None:
        self.__model = new_model

    # ---- FETCH properties for option creation ---- #
    # The send str is in the format: "model|description
    #                                 model|description"

    @property
    def model_list(self) -> str:
        """
        Gets each unique type of model from the available list of models in the API key, paired with a description, and
        separates each with a comma.
        :return: str
        """
        return "\n".join([f"{model.id}|{MODEL_DESCRIPTIONS[model.id]}" for model in self.__client.models.list()])

    # ---------------------------------------------- #

    def update_tuning_parameter(self, param: str, value: Any) -> bool:
        """
        Updates the tuning parameter.
        :param str param: The name of the parameter.
        :param Any value: The new value of the parameter.
        :return: bool - whether the given parameter exists or not and hence if the action was completed or not.
        """
        if self.__tuning_parameters.get(param, None) is not None:
            self.__tuning_parameters[param] = value
            return True

        return False

    def generate_text(self, prompt) -> \
            Union[completions.ChatCompletion, completions.Stream[completions.ChatCompletionChunk], None]:
        """
        Create a human-like response to a prompt.
        Code was accessed from: https://platform.openai.com/docs/quickstart
        :return: Either a successful response or none.
        """
        response: Union[completions.ChatCompletion, completions.Stream[completions.ChatCompletionChunk], str] = ""
        try:
            response = self.__client.chat.completions.create(
                # model=self.__model,
                model="gpt-4o-mini",  # Uncomment the above when pop-ups are tested.
                messages=[
                    {
                        "role": "system",
                        "content": self.__tuning_parameters["response style"]  # How the system should respond as
                    },
                    {
                        "role": "user",
                        "content": prompt  # user prompt
                    }
                ],
                temperature=self.__tuning_parameters["temperature"],
                stream=self.__tuning_parameters["stream"]  # whether we want it to have the response like ChatGPT, where bits of a response come in
                # intervals (True), or all at once. Use below if stream=True
                # for chunk in response:
                #     print(chunk.choices[0].text, end="")
            )
            print(response.choices[0].message)

        except APIConnectionError:
            print("\033[31mAPI Connection Error! The server could not be reached.\033[0m")

        except RateLimitError:
            print("\033[31mRate Limit Error! You need to top up your credits or hit your monthly spend.\033[0m")

        except openai.NotFoundError as e:
            print(f"\033[31mCheck the model you are using, it may not exist...\nFull error code:\n{e}\033[0m")

        # Other errors that may show up, please see: https://platform.openai.com/docs/guides/error-codes/api-errors

        return response


if __name__ == "__main__":  # Testing area for openAIClient stuff
    client = OpenAIClient()
