from rest_framework import serializers

from .models import Category, Channel, Server


# Serializer for Channel model
class ChannelSerializers(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = '__all__'
# Serializer for Server model


class ServerSerializers(serializers.ModelSerializer):
    # Custom field for total members
    total_members = serializers.SerializerMethodField()
    # Nested serializer for related channels
    channel_server = ChannelSerializers(many=True)
    category = serializers.StringRelatedField()

    class Meta:
        model = Server
        exclude = ("member",)  # Exclude the 'member' field from serialization

    def get_total_members(self, obj):
        """Return the total number of members if available."""
        return obj.total_members if hasattr(obj, "total_members") else None

    def to_representation(self, instance):
        """Customize the serialized output."""
        data = super().to_representation(instance)
        if not self.context.get("total_members"):
            # Remove total_members if it's null
            data.pop("total_members", None)
        return data

# Serializer for Category model


class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
