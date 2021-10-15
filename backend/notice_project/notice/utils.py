import random
import string
from .storage import db


# initializing size of string
N = 32

# using random.choices()
# generating random strings
def random_string():
    """This function is used to generate random strings of 32 characters"""
    res = "".join(random.choices(string.ascii_lowercase + string.digits, k=N))
    return res


def user_rooms(org_id, user_id):
    """This function returns all the rooms a user belongs to"""
    user_rooms = []
    response = db.read("noticeboard_room", org_id)

    if response["status"] == 200:
        room = response["data"][0]
        # room_members = room["room_member_id"]
        # if user_id in room_members:
        user_rooms.append(
            {
                "room_name": room["room_name"],
                "room_id": "/noticeboard",
                "room_image": "https://media.istockphoto.com/vectors/notice-paper-with-push-pin-icon-in-trendy-flat-design-vector-id1219927783?k=20&m=1219927783&s=612x612&w=0&h=DJ9N_kyvpqh11qHOcD0EZVbM0NeBNC_08oViRjo7G7c=",
            }
        )
        return user_rooms
