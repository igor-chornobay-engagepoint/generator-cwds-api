package gov.ca.cwds.<%=apiPackage %>;

import gov.ca.cwds.<%=apiPackage %>.web.rest.system.SystemInformationResourceTest;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

/**
 * @author CWDS <%=apiTeam %> Team
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({
    SystemInformationResourceTest.class
})
public class SmokeTestSuite {
}
