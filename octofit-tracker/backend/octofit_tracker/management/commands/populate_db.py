from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # clear existing data
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()

        # create users
        users = []
        for name, email in [
            ('Spider-Man', 'spiderman@marvel.com'),
            ('Iron Man', 'ironman@marvel.com'),
            ('Batman', 'batman@dc.com'),
            ('Superman', 'superman@dc.com'),
        ]:
            users.append(User.objects.create(name=name, email=email))

        # create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        marvel.members.set(users[:2])
        dc.members.set(users[2:])

        # leaderboard entries
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=150)

        # activities and workouts for each user
        for user in users:
            Activity.objects.create(user=user, activity_type='running', duration=30)
            Workout.objects.create(user=user, name='Cardio Blast', description='A quick cardio workout', duration=45)

        self.stdout.write(self.style.SUCCESS('Database populated with sample users, teams, activities, leaderboard, and workouts'))
