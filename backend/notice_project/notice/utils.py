from .storage import db

def user_rooms(org_id, user_id):
    user_rooms = []
    all_org_rooms = db.read("test_noticeboard_room", org_id)["data"]

    if all_org_rooms:
        for room in all_org_rooms:
            if user_id in room["member_ids"]:
                user_rooms.append({"room_name": room["title"], "room_url": f"noticeboard/{room['_id']}", "room_image": room["icon"]})
        return user_rooms
    return user_rooms