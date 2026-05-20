import { OpenAPIV3 } from "openapi-types";

const notificationTags: OpenAPIV3.TagObject = {
  name: "Notification",
  description: "Operations related to Notification",
};

const notificationSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  NotificationResponse: {
    properties: {
      id: { type: "string", format: "uuid" },
      userId: { type: "string", format: "uuid" },
      notification_type: {
        type: "string",
        enum: ["INFO", "ALERTE", "RAPPEL", "PROMOTION"],
        description: "Type de notification",
      },
      content: { type: "string" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },
};

const notificationPath: OpenAPIV3.PathsObject = {
  "/notification": {
    post: {
      tags: ["Notification"],
      summary: "Create a notification",
      description: "Create a new notification for a user",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["userId", "notification_type", "content"],
              properties: {
                userId: { type: "string", format: "uuid" },
                notification_type: {
                  type: "string",
                  enum: ["INFO", "ALERTE", "RAPPEL", "PROMOTION"],
                },
                content: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Notification created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/NotificationResponse" },
                },
              },
            },
          },
        },
        "400": { description: "Invalid input" },
        "404": { description: "User not found" },
      },
    },
    get: {
      tags: ["Notification"],
      summary: "Get notifications with pagination",
      description: "Get all notifications",
      parameters: [
        {
          name: "page",
          in: "query",
          schema: { type: "integer", default: 1 },
          description: "Page number",
        },
        {
          name: "limit",
          in: "query",
          schema: { type: "integer", default: 10 },
          description: "Number of items per page",
        },
      ],
      responses: {
        "200": {
          description: "Paginated Notifications",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: {
                    type: "object",
                    properties: {
                      rows: {
                        type: "array",
                        items: { $ref: "#/components/schemas/NotificationResponse" },
                      },
                      count: { type: "integer" },
                      page: { type: "integer" },
                      limit: { type: "integer" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/notification/type/{id}": {
    patch: {
      tags: ["Notification"],
      summary: "Update notification type by ID",
      description: "Change the type of a notification",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the notification",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["notification_type"],
              properties: {
                notification_type: {
                  type: "string",
                  enum: ["INFO", "ALERTE", "RAPPEL", "PROMOTION"],
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Notification type updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/NotificationResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Notification not found" },
      },
    },
  },

  "/notification/{id}": {
    get: {
      tags: ["Notification"],
      summary: "Get notification by ID",
      description: "Retrieve a notification by its unique id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the notification",
        },
      ],
      responses: {
        "200": {
          description: "Notification found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/NotificationResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Notification not found" },
      },
    },
    patch: {
      tags: ["Notification"],
      summary: "Update notification by ID",
      description: "Update all fields of a notification",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the notification",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userId: { type: "string", format: "uuid" },
                notification_type: {
                  type: "string",
                  enum: ["INFO", "ALERTE", "RAPPEL", "PROMOTION"],
                },
                content: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Notification updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/NotificationResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Notification not found" },
      },
    },
    delete: {
      tags: ["Notification"],
      summary: "Delete notification by ID",
      description: "Soft delete a notification by its unique id",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the notification",
        },
      ],
      responses: {
        "200": { description: "Notification deleted successfully" },
        "404": { description: "Notification not found" },
      },
    },
  },
};

export { notificationTags, notificationSchema, notificationPath };