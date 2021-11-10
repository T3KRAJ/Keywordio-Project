from rest_framework.viewsets import ModelViewSet 
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Books
from .serializers import BookSerializer

class BookViewSet(ModelViewSet):
    queryset = Books.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

