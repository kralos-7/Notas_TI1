from src.main import is_valid_email_address

def test_regular_email_validates():
    assert is_valid_email_address('test@example.org')
    assert is_valid_email_address('user123@subdomain.example.org')
    assert is_valid_email_address('john.doe@email.example.org')

def test_valid_email_has_one_at_sign():
    assert not is_valid_email_address('john.doe')

def test_valid_email_has_only_allowed_chars():
    assert not is_valid_email_address('john,doe@example.org')
    assert not is_valid_email_address('not valid@example.org')