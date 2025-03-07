from django.db.models import Count
from drf_spectacular.utils import extend_schema
from rest_framework import response, viewsets
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Category, Server
from .schema import Server_list_docs
from .serializers import CategorySerializers, ServerSerializers


class CategoryListVS(viewsets.ViewSet):
    queryset = Category.objects.all()

    @extend_schema(responses=CategorySerializers)
    def list(self, request):
        serializers = CategorySerializers(self.queryset, many=True)
        return Response(serializers.data)


# ViewSet for managing Server instances
class ServerListVS(viewsets.ViewSet):
    queryset = Server.objects.all()  # Base queryset for all servers
    # permission_classes = [IsAuthenticated]

    @Server_list_docs
    def list(self, request):
        '''This method processes incoming to filter and return a list of servers    It supports filtering by category, user, server ID, and limiting the number of results.

        Args:
            request (Request): The HTTP request object containing query parameters.

        Query Parameters:
            category (str, optional): The category of servers to retrieve. If provided, the queryset is filtered to include only servers in this category.
            by_user (bool, optional): If set totrue", the queryset is filtered to include servers associated with the authenticated user.
            qty (int, optional): The maximum number of servers to return. If provided, limits the queryset to this number.
            by_serverid (int, optional): The ID of a specific server to retrieve. If provided, the queryset is filtered to include only this server.
            num_members (bool, optional): If set to "true", the total number of members for each server is included in the response.

        Returns:
            Response: A Response object containing the serialized list of servers. The data includes the server details and, if requested, the total number of members for each server.

        Raises:
            AuthenticationFailed: If the user attempts to filter by user or server ID without being authenticated.
            ValidationError: 
                - If the provided ID does not match any existing server.
                - If the quantity value is invalid (not an integer).
                - If the server ID value is invalid (not an integer).

        Example:
            GET /servers?category=gaming&by_user=true&qty=5&num_members=true

        Notes:
            - The method first checks for user authentication if filtering by user or server ID.
            - The queryset is modified based on the provided query parameters before serialization.
        """
        # Method implementation...'''

        # Retrieve query parameters
        category = request.query_params.get("category")
        by_user = request.query_params.get("by_user") == "true"
        qty = request.query_params.get("qty")
        by_serverid = request.query_params.get("by_serverid")
        num_members = request.query_params.get("num_members") == "true"

        # Apply filters based on query parameters
        if category:
            self.queryset = self.queryset.filter(category__name=category)

        if by_user:
            if by_user and request.user.is_authenticated:
                user_id = request.user.id
                self.queryset = self.queryset.filter(member=user_id)
            else:
                raise AuthenticationFailed("User must be authenticated.")

        if num_members:
            self.queryset = self.queryset.annotate(
                total_members=Count("member"))

        if by_serverid:
            if not request.user.is_authenticated:
                raise AuthenticationFailed()
            try:
                self.queryset = self.queryset.filter(id=by_serverid)
                if not self.queryset.exists():
                    raise ValidationError(
                        f"Server with ID {by_serverid} not found.")
            except ValueError:
                raise ValidationError("Invalid server ID value.")

        if qty:
            try:
                self.queryset = self.queryset[:int(qty)]
            except ValueError:
                raise ValidationError("Invalid quantity value.")

        # Serialize and return the response
        serializer = ServerSerializers(self.queryset, many=True, context={
                                       "total_members": num_members})
        return response.Response(serializer.data)
