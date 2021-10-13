from .storage import db


def user_rooms(org_id, user_id):
    """This function returns all the rooms a user belongs to"""
    user_rooms = []
    response = db.read("noticeboard_room", org_id)
    # print('='*50)
    # print(response)
    # print('='*50)

    if response["status"] == 200:
        room = response["data"][0]
        user_rooms.append(
            {
                "room_name": room["room_name"],
                "room_url": "/noticeboard",
                "room_image": "https://media.istockphoto.com/vectors/notice-paper-with-push-pin-icon-in-\
                                trendy-flat-design-vector-id1219927783?k=20&m=1219927783&s=612x612&w=0&h=\
                                DJ9N_kyvpqh11qHOcD0EZVbM0NeBNC_08oViRjo7G7c=",
            }
        )
        return user_rooms


def members_of_a_room(request, org_id, room_id, user_id):
    """Returns a list of members in a room"""
    room_members = []

    room = db.read("noticeboard_room", org_id, filter={"room_id": room_id})

    if room["status"] == 200:
        if request.method == "POST":
            room_members.append(user_id)
            return room_members
        if request.method == "PATCH":
            room_members.remove(user_id)
            return room_members
