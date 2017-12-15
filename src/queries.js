import gql from 'graphql-tag'

export default {
    projects: {
        name: 'Projects',
        gql: gql(`
{projects {
    key
    name
    fullName
    hosts
    infraServicesNode
    storageNode
    nfsServer
    essentialServicesNodes {
      appIP
      storageIP
    }
    buildSlaves
    computeNodes {
      appIP
      storageIP
    }
    vlan
    dhcpGroup
    rocketChatRoomId
}}`)
    },
    dashboards: {
        name: 'Dashboards',
        gql: gql(`
{dashboards {
  projectKey
  projectName
  url
  deployKey
  dbName
  dbUser
  dbPassword
  instanceName
  infraAgent
  host
  nfs
  version
}}`)
    },
    dockerRegistries: {
        name: 'Docker Registries',
        gql: gql(`
{dockerRegistries {
  appName
  appVersion
  instanceName
  host
  tag
  url
}}`)
    },
    nexus: {
        name: 'Nexus',
        gql: gql(`
{nexus {
  appName
  appVersion
  instanceName
  tag
}}`)
    },
    sonarqubes: {
        name: 'Sonarqubes',
        gql: gql(`
{sonarqubes {
  appName
  appVersion
  instanceName
  tag
}}`)
    },
    jenkins: {
        name: 'Jenkins',
        gql: gql(`
{jenkins {
  projectKey
  appName
  appVersion
  instanceName
  tag
  buildSlave
  reportingImporter
}}`)
    },
    gitLabs: {
        name: 'Gitlabs',
        gql: gql(`
{gitLabs {
  projectKey
  appName
  appVersion
  instanceName
  tag
  gitlabUsers
}}`)
    },
    appStarter: {
        name: 'Appstarter',
        gql: gql(`
{appStarter {
  name
  projectKey
  jenkinsInstanceName
  gitlabInstanceName
}}`)
    },
    httpChecks: {
        name: 'HttpChecks',
        gql: gql(`
{httpChecks {
  name
  URL
  checkHttpStatusCode
  text
}}`)
    },
    sshChecks: {
        name: 'SshChecks',
        gql: gql(`
{sshChecks {
  name
  host
}}`)
    },

}