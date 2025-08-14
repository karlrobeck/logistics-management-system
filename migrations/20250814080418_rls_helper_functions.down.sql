-- Add down migration script here
-- Drop RLS Helper Functions
-- Revoke permissions first
revoke execute on function auth.current_user_id() from public;

revoke execute on function org.current_user_organizations() from public;

revoke execute on function org.current_user_has_org_access(uuid) from public;

revoke execute on function org.current_user_teams(uuid) from public;

revoke execute on function org.current_user_roles(uuid) from public;

revoke execute on function org.current_user_has_permission(uuid, org.permission_actions) from public;

revoke execute on function org.current_user_is_org_owner(uuid) from public;

revoke execute on function org.current_organization_id() from public;

-- Drop functions in reverse order
drop function if exists org.current_organization_id();

drop function if exists org.current_user_is_org_owner(uuid);

drop function if exists org.current_user_has_permission(uuid, org.permission_actions);

drop function if exists org.current_user_roles(uuid);

drop function if exists org.current_user_teams(uuid);

drop function if exists org.current_user_has_org_access(uuid);

drop function if exists org.current_user_organizations();

drop function if exists auth.current_user_id();

