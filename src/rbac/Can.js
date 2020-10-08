import rulesList from './rules'

const check = (rules, role, action, data) => {
  const permissions = rules[role]
  if (!permissions) {
    return false
  }

  const staticPermissions = permissions.static

  if (staticPermissions && staticPermissions.includes(action)) {
    return true
  }

  const dynamicPermissions = permissions.dynamic

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action]
    if (!permissionCondition) {
      return false
    }

    return permissionCondition(data)
  }
  return false
}

const Can = ({ rules, role, perform, data, yes, no }) => {
  return check(rules, role, perform, data) ? yes() : no()
}

Can.defaultProps = {
  rules: rulesList,
  yes: () => null,
  no: () => null,
}

export default Can
