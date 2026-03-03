"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.response import Response
from . import views

# custom API root view that uses the CODESPACE_NAME environment variable
# to construct absolute URLs. This prevents problems with HTTPS certificates
# when the request host isn't the codespace-hosted URL.
class CustomAPIRootView(routers.APIRootView):
    def get(self, request, *args, **kwargs):
        codespace = os.environ.get('CODESPACE_NAME')
        if codespace:
            base = f"https://{codespace}-8000.app.github.dev/api"
            return Response({
                'users': f"{base}/users/",
                'teams': f"{base}/teams/",
                'activities': f"{base}/activities/",
                'leaderboard': f"{base}/leaderboard/",
                'workouts': f"{base}/workouts/",
            })
        # fall back to default behavior (uses request data)
        return super().get(request, *args, **kwargs)

router = routers.DefaultRouter()
# assign custom root view before registering viewsets
router.APIRootView = CustomAPIRootView
router.register(r'users', views.UserViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'activities', views.ActivityViewSet)
router.register(r'leaderboard', views.LeaderboardViewSet)
router.register(r'workouts', views.WorkoutViewSet)

urlpatterns = [
    # prefix all API endpoints with /api/
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
]
