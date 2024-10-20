from openai import OpenAI, APIConnectionError
from openai.resources.chat import completions
from typing import *


class OpenAIClient:
    def __init__(self):
        with open("API_Key.txt", "r") as key_file:
            self.__api_key = key_file.readlines(1)[0].rstrip("\n")

        self.__client = OpenAI(api_key=self.__api_key)
        # TEST ENTERED API KEY - done by making a request to do something, if a response was given connection is valid.

    def generate_text(self) -> Union[completions.ChatCompletion, completions.Stream[completions.ChatCompletionChunk], 
                                     None]:
        """
        Create a human-like response to a prompt.
        Code was accessed from: https://platform.openai.com/docs/quickstart
        :return: Either a successful response or none.
        """
        responses: Union[completions.ChatCompletion, completions.Stream[completions.ChatCompletionChunk], None] = None
        try:
            responses = self.__client.chat.completions.create(
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
            print("\033[31mAPI Connection Error! Check that API Key in API_Key.txt is valid.\033[0m")

        print(responses.choices[0].message)

        return responses
