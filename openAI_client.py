import openai
from openai import OpenAI, APIConnectionError, RateLimitError, AuthenticationError
from openai.resources.chat import completions
from typing import *


# For more info on openai module see: https://github.com/openai/openai-python


class OpenAIClient:
    def __init__(self):
        with open("API_Key.txt", "r") as key_file:
            self.__api_key = key_file.readlines(1)[0].rstrip("\n")

        self.__client = OpenAI(api_key=self.__api_key)

        try:
            self.__client.models.list()  # tries getting a list of all the models the user has access to, in their key.

        except AuthenticationError:
            print("\033[31mInvalid API Key, ensure the key provided in API_Key.txt is correct.\033[0m")

        self.__temperature = 0.7
        self.__stream = False
        self.__response_style = "You are a helpful assistant"

        self.__conversation = "New Chat"  # if user selects a conversation or is in one, this will be set to that.

    @property
    def conversation(self) -> str:
        return self.__conversation

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
                model="gpt-4o-mini",  # You need a subscription to use this model
                messages=[
                    {
                        "role": "system",
                        "content": self.__response_style  # How the system should respond as
                    },
                    {
                        "role": "user",
                        "content": prompt  # user prompt
                    }
                ],
                temperature=self.__temperature,
                stream=self.__stream  # whether we want it to have the response like ChatGPT, where bits of a response come in
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
