# Implement Login and Authorization into an existing application

## Requirements

- Hide the entire interface until the user has logged in.
- When a user logs in, add a "Log Out" link in the header
- Implement the following RBAC rules:

1. Logged In Users with 'read' permissions can see the list of records
2. Logged In Users with 'delete' permissions can delete records
3. Logged In Users with 'update' permissions can edit existing records
4. Logged In Users with 'create' permissions can create new records

## Notes

- You may not alter the functionality of the existing application components.
- You may only grant access using RBAC
- The server has the following user accounts (username:password) that you can use to login as a user with varying permissions
  admin:ADMIN (create, read, update, delete)
  editor:EDITOR (create, read, update)
  user:USER (read)

## Testing

- Write a suite of UI tests that assert the existence of components based on user login state.
- You will need to create some mocking interface to fake a server/login to simulate.
