//introdution to keycloack

//Login
//Register

# Realm Settings

## Tokens

SSO Session Idle = refresh token

# realms

A real is like an organization.  
A realm manages a set of users, credentials, roles, and groups. A user belongs to and logs into a realm. Realms are isolated from one another and can only manage and authenticate the users that they control.

# clients

Client is like the list of applications that an organization provide.
Clients are entities that can request Keycloak to authenticate a user. Most often, clients are applications and services that want to use Keycloak to secure themselves and provide a single sign-on solution. Clients can also be entities that just want to request identity information or an access token so that they can securely invoke other services on the network that are secured by Keycloak.

## Scopes

Scope is a mechanism in OAuth 2.0 to limit an application's access to a user's account. An application can request one or more scopes.

# Realm Roles

Global roles for the whole organization

# Composite Roles

Contain and other roles as well
