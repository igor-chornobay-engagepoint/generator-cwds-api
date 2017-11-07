package gov.ca.cwds.<%=apiPackage %>.web;

import gov.ca.cwds.<%=apiPackage %>.<%=apiClass %>ApiApplication;
import gov.ca.cwds.<%=apiPackage %>.<%=apiClass %>ApiConfiguration;
import gov.ca.cwds.<%=apiPackage %>.web.rest.RestClientTestRule;
import io.dropwizard.testing.ResourceHelpers;
import io.dropwizard.testing.junit.DropwizardAppRule;
import java.time.format.DateTimeFormatter;
import javax.ws.rs.client.Client;
import org.glassfish.jersey.client.JerseyClient;
import org.junit.After;
import org.junit.ClassRule;
import org.junit.Rule;

/**
 * @author CWDS <%=apiTeam %> Team
 */
public abstract class BaseApiIntegrationTest {

  private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter
      .ofPattern("yyyy-MM-dd HH:mm:ss");

  private static final String configFile = "config/test-<%=apiProjectName %>-api.yml";

  @ClassRule
  public static final DropwizardAppRule<<%=apiClass %>ApiConfiguration> appRule =
      new DropwizardAppRule<<%=apiClass %>ApiConfiguration>(
          <%=apiClass %>ApiApplication.class, ResourceHelpers.resourceFilePath(configFile)) {

        @Override
        public Client client() {
          Client client = super.client();
          if (((JerseyClient) client).isClosed()) {
            client = clientBuilder().build();
          }
          return client;
        }
      };

  @Rule
  public RestClientTestRule clientTestRule = new RestClientTestRule(appRule);


  @After
  public void tearDown() throws Exception {
  }

}
