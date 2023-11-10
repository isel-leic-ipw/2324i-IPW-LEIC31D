# What is a Web API?

Is a bunch of resources and the supported operations for each resource.

A web API contains:
    - Resources
      - Each resource must have its own an URI
    - Operations
      - What operations each resource supports (GET, PUT, POST, DELETE)

For each resource we must define it valid operations.
For each operation we must define:
    - Request (what and where additional request information)
    - Responses. For each response:
      - Status code
      - Headers
      - Body

- Popular Events - /events/popular
- Events         - /events
- Groups         - /groups
  - GET - List all groups
  - POST - Create a group
- Group          - /groups/:groupId
  - GET
  - PUT
  - DELETE
- Group Events   - /groups/:groupId/groupEvents or /groups/:groupId/events
  - POST
- Group Event    - /groups/:groupId/events/:eventId/:repetition
  - PUT
  - DELETE
- Users

