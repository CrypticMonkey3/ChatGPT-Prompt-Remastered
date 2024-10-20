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
            self.__client.models.list()

        except AuthenticationError:
            print("\033[31mInvalid API Key, ensure the key provided in API_Key.txt is correct.\033[0m")

    def generate_text(self) -> \
            Union[completions.ChatCompletion, completions.Stream[completions.ChatCompletionChunk], None]:
        """
        Create a human-like response to a prompt.
        Code was accessed from: https://platform.openai.com/docs/quickstart
        :return: Either a successful response or none.
        """
        response: Union[completions.ChatCompletion, completions.Stream[completions.ChatCompletionChunk], None] = None
        try:
            response = self.__client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant"
                    },
                    {
                        "role": "user",
                        "content": "Write a haiku about recursion in programming."
                    }
                ]
            )

        except APIConnectionError:
            print("\033[31mAPI Connection Error! The server could not be reached.\033[0m")

        except RateLimitError:
            print("\033[31mRate Limit Error! You need to top up your credits or hit your monthly spend.\033[0m")

        # Other errors that may show up, please see: https://platform.openai.com/docs/guides/error-codes/api-errors

        if response is not None:
            print(response.choices[0].message)

        return response


if __name__ == "__main__":  # Testing area for openAIClient stuff
    client = OpenAIClient()
