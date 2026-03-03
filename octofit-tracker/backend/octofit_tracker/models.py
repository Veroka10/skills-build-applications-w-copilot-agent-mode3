from django.db import models


class User(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.email


class Team(models.Model):
    name = models.CharField(max_length=100)
    members = models.ManyToManyField('User', related_name='teams', blank=True)

    def __str__(self):
        return self.name


class Activity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=50)
    duration = models.IntegerField()  # duration in minutes
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.activity_type}"


class Leaderboard(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='leaderboards')
    points = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.team.name}: {self.points}"


class Workout(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='workouts')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    duration = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
