import pytest
from src.main import is_valid_email_address

@pytest.mark.parametrize(
    "input_email, expected",
    [
        ('test@example.org',True),
        ('user123@subdomain.example.org',True),
        ('john.doe@email.example.org',True),
        ('john.doe',False),
        ('john,doe@example.org',False),
        ('not valid@example.org',False)
    ]
)
def test_email_validates_params(input_email, expected):
    assert is_valid_email_address(input_email) ==expected