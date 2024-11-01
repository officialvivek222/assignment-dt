# Table 1: Nudge API Endpoints

| Request Type | Base URL | API Endpoint | Payload | Description |
|-------------|----------|--------------|---------|-------------|
| GET | /api/v3/app | /nudges?id=:nudge_id | - | Gets a nudge by its unique id |
| GET | /api/v3/app | /nudges?eventId=:event_id | - | Gets all nudges associated with an event |
| GET | /api/v3/app | /nudges?status=published&limit=10&page=1 | - | Gets nudges filtered by status & paginated results |
| POST | /api/v3/app | /nudges | eventId, title, files[coverImage], scheduling[scheduledDate, startTime, endTime], description, minimizedView[iconId, oneLineInvitation] | Creates a new nudge and returns the Id of the created nudge |
| PUT | /api/v3/app | /nudges/:id | Same as POST payload | Updates an existing nudge |
| DELETE | /api/v3/app | /nudges/:id | - | Deletes a nudge based on its Unique Id |
| POST | /api/v3/app | /nudges/:id/publish | - | Publishes a draft nudge |
| POST | /api/v3/app | /nudges/images | files[image] | Uploads an image for the nudge |

# Table 2: Object Data Model of a Nudge

| Field | Type | Description |
|-------|------|-------------|
| type | "nudge" | Type identifier for the object |
| id | string | Unique identifier for the nudge |
| eventId | string | Reference to the tagged event |
| title | string | Name of the nudge (max 60 chars) |
| coverImage | object | {url: string, altText: string} |
| scheduling | object | {scheduledDate: YYYY-MM-DD, startTime: HH:mm, endTime: HH:mm} |
| description | string | Detailed description of the nudge |
| minimizedView | object | {iconId: string, oneLineInvitation: string} |
| status | string | "draft" or "published" |
| createdAt | timestamp | Creation timestamp |
| updatedAt | timestamp | Last update timestamp |
| createdBy | string | User ID who created the nudge |

# Table 3: Response Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created successfully |
| 204 | Deleted successfully |
| 400 | Bad Request - validation errors |
| 401 | Unauthorized - invalid token |
| 403 | Forbidden - insufficient permissions |
| 404 | Not Found - resource doesn't exist |
| 500 | Internal Server Error |

# Table 4: Query Parameters for GET /nudges

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| id | string | Filter by nudge ID | ?id=123 |
| eventId | string | Filter by event ID | ?eventId=456 |
| status | string | Filter by status | ?status=published |
| page | number | Page number for pagination | ?page=1 |
| limit | number | Items per page | ?limit=10 |

# Table 5: Validation Rules

| Field | Rule |
|-------|------|
| title | Required, max 60 chars |
| description | Required, max 1000 chars |
| scheduledDate | Must be future date |
| startTime | Required, 24-hour format |
| endTime | Required, must be after startTime |
| oneLineInvitation | Required, max 100 chars |
| coverImage | Max 5MB, JPG/PNG/WebP only |
| eventId | Must be valid existing event ID |
| iconId | Must be valid icon reference |
