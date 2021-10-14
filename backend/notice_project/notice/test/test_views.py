from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class BookmarkTest(APITestCase):
    def test_list_bookmark(self):
<<<<<<< HEAD
        org_id = "1234567890"
        user_id = "1234567890"
        bookmark_list_url = reverse("list-bookmark", args=[org_id, user_id])
        response = self.client.get(bookmark_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_bookmark(self):
        org_id = "1234567890"
        notice_id = "1234567890"
        user_id = "1234567890"
        bookmark_create_url = reverse("create-bookmark", args=[org_id])
        data = {"notice_id":notice_id, "user_id":user_id}
        response = self.client.post(bookmark_create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete_bookmark(self):
        org_id = "1234567890"
        bookmark_id = "6161836c45f4970635487e70"
        bookmark_delete_url = reverse('delete-bookmark', args=[org_id, bookmark_id])
        response = self.client.delete(bookmark_delete_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
=======
        pass
>>>>>>> 77a1721949de43c67f872bde6a4d164ca8be056a
