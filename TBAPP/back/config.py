#!/usr/bin/env python
# -*- coding: utf-8 -*-
from dotenv import load_dotenv
load_dotenv()

# OR, the same with increased verbosity
load_dotenv(verbose=True)

# OR, explicitly providing path to '.env'
from pathlib import Path  # Python 3.6+ only
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

import os

def get_env_variable(name):
    try:
        return os.environ[name]
    except KeyError:
        message = "Expected environment variable '{}' not set.".format(name)
        raise Exception(message)

class Config(object):

    DEBUG = True
    SECRET_KEY ='tbapp'
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = 'postgres://postgres:123@localhost:5555/tbapp'
    # SQLALCHEMY_DATABASE_URI = 'postgres://postgres:qcyxiyaqc@localhost/db_tbapp'

    # app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ueasistemas:ueasistemas@localhost/ueasistemas'
    # app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    # app.config['SECRET_KEY'] = 'ueasempre'
