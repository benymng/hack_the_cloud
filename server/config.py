import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path, override=True)

DEBUG = False
SECRET_KEY = os.environ["SECRET_KEY"]
