from src.login import login

def test_login_valid():
    login_good = login("umarino","2019-2024")
    assert login_good

def test_login_invalid():
    login_bad = login("umarinox","2018-2025")
    assert not login_bad
