from .storage import db


def user_rooms(org_id, user_id):
    user_rooms = []
    response = db.read("noticeboard_room", org_id)
    print('='*50)
    print(response)
    print('='*50)

    if response["status"] == 200:
        room = response["data"][1]
        user_rooms.append({"room_name": room["title"], "room_url": "/noticeboard/admin-notice", "room_image": room["icon"]})
        return user_rooms






'''
def user_rooms(org_id, user_id):
    user_rooms = []
    response = db.read("test_noticeboard_room", org_id)

    if response["status"] == 200:
        all_org_rooms = response["data"]
        if all_org_rooms:
            for room in all_org_rooms:
                if user_id in room["member_ids"]:
                    user_rooms.append({"room_name": room["title"], "room_url": "/noticeboard", "room_image": room["icon"]})
            return user_rooms
        return user_rooms

'''
# /{room['_id']
