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


if __name__ == "__main__":
    install_packages(["flask", "openai", "markdown2"])
