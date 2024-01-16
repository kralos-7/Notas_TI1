from src.models.language_model import language_model

def test_get_languages_empty():
    langs = language_model.get_languages()
    assert langs != None

def test_get_languages_has_items():
    langs = language_model.get_languages()
    assert len(langs) > 0

def test_get_languages_size_items():
    langs = language_model.get_languages()
    for lang in langs:
        assert len(lang) > 0
