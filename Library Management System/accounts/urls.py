from rest_framework import routers
from accounts.views import BookViewSet

router = routers.SimpleRouter()
router.register(r'book', BookViewSet)
urlpatterns = router.urls