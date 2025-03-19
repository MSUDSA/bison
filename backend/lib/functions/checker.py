

def https_checker(url: str):
    if url.find("https") == -1:
        url = url.replace("http", "https")
    return url
