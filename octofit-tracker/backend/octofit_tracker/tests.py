from django.test import TestCase
from rest_framework.test import APIClient


class APIRootTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_root_has_api(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        # router root should include the various endpoints
        data = response.json()
        self.assertIn('users', data)
        self.assertIn('teams', data)
        self.assertIn('activities', data)
        self.assertIn('leaderboard', data)
        self.assertIn('workouts', data)

    def test_users_endpoint(self):
        response = self.client.get('/users/')
        self.assertEqual(response.status_code, 200)

    def test_teams_endpoint(self):
        response = self.client.get('/teams/')
        self.assertEqual(response.status_code, 200)

    def test_activities_endpoint(self):
        response = self.client.get('/activities/')
        self.assertEqual(response.status_code, 200)

    def test_leaderboard_endpoint(self):
        response = self.client.get('/leaderboard/')
        self.assertEqual(response.status_code, 200)

    def test_workouts_endpoint(self):
        response = self.client.get('/workouts/')
        self.assertEqual(response.status_code, 200)
