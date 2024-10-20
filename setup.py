import subprocess
import sys
from typing import *


def install_packages(packages: List[str]):
    for package in packages:
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])


if __name__ == "__main__":
    with open("README.md", "r") as file:
        content = file.readlines()

    # get a list of modules as required from the README.md, by filtering for lines that start with >, and then
    # removes unnecessary detail off each of those that start with > .
    module_requirements = list(map(lambda y: y.split(">")[1].strip(), filter(lambda x: x.startswith(">"), content)))

    install_packages(module_requirements)
