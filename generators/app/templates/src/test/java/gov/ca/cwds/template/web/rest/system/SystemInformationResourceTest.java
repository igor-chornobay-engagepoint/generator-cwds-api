package gov.ca.cwds.<%=apiPackage %>.web.rest.system;

import gov.ca.cwds.<%=apiPackage %>.Constants;
import gov.ca.cwds.<%=apiPackage %>.service.dto.system.HealthCheckResultDTO;
import gov.ca.cwds.<%=apiPackage %>.service.dto.system.SystemInformationDTO;
import gov.ca.cwds.<%=apiPackage %>.web.BaseApiIntegrationTest;
import org.junit.Test;

import javax.ws.rs.core.MediaType;
import java.io.IOException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

/**
 * Created by CWDS <%=apiTeam %> Team
 */
public class SystemInformationResourceTest extends BaseApiIntegrationTest {

  @Test
  public void testSystemInformationGet() throws IOException {
    SystemInformationDTO systemInformationDTO = clientTestRule
        .target(Constants.API.SYSTEM_INFORMATION_PATH)
        .request(MediaType.APPLICATION_JSON)
        .get(SystemInformationDTO.class);
    assertEquals("<%=apiProper %> API", systemInformationDTO.getApplication());
    assertNotNull(systemInformationDTO.getVersion());
    assertNotNull(systemInformationDTO.getDeadlocks());

    assertDeadlocks(systemInformationDTO.getDeadlocks());
  }

  public void assertDeadlocks(HealthCheckResultDTO healthCheckResultDTO) {
    assertNotNull(healthCheckResultDTO);
    assertTrue(healthCheckResultDTO.isHealthy());
  }
}
