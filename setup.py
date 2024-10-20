import subprocess
import sys
from typing import *


def install_packages(packages: List[str]) -> None:
    """
    Installs packages as specified in the list.
    :param List[str] packages: List of package names to install
    :return: None
    """
    for package in packages:
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])


def auto_install() -> None:
    """
    Automatically installs everything required if this function is run, or is done anyway when main.py is run.
    :return: None
    """
    with open("README.md", "r") as file:
        content = file.readlines()

    # get a list of modules as required from the README.md, by filtering for lines that start with >, and then
    # removes unnecessary detail off each of those that start with > .
    module_requirements = list(map(lambda y: y.split(">")[1].strip(), filter(lambda x: x.startswith(">"), content)))

    install_packages(module_requirements)


if __name__ == "__main__":
    auto_install()
