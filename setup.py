import subprocess
import sys
from typing import *


def install_packages(packages: List[str]):
    for package in packages:
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])


if __name__ == "__main__":
    install_packages(["openai"])
