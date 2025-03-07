import os

from PIL import Image
from rest_framework.exceptions import ValidationError


def vallidater_image_icon(image):
    if image:
        with Image.open(image) as img:
            if img.width > 80 or img.height > 80:
                raise ValidationError(
                    f"The uploaded file is too large. Please upload a file smaller than{img.size}")


def vallidater_image_file_exstension(value):
    exstension = os.path.splitext(value.name)[1].lower()
    valid_extensions = [".jpg", ".jpeg", ".png", ".gif"]
    if not exstension.lower() in valid_extensions:
        raise ValidationError(
            f"Invalid file type. Please upload an image file with one of the following extensions jpg, jpeg, png, gif")
