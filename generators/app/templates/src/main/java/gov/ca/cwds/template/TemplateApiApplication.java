package gov.ca.cwds.<%=apiPackage %>;

import com.google.inject.Module;
import gov.ca.cwds.<%=apiPackage %>.inject.ApplicationModule;
import io.dropwizard.setup.Bootstrap;

/**
 * @author CWDS <%=apiTeam %> Team
 */

public class <%=apiClass %>ApiApplication extends Base<%=apiClass %>ApiApplication<<%=apiClass %>ApiConfiguration> {

  public static void main(String[] args) throws Exception {
    new <%=apiClass %>ApiApplication().run(args);
  }

  @Override
  public Module applicationModule(Bootstrap<<%=apiClass %>ApiConfiguration> bootstrap) {
    return new ApplicationModule<<%=apiClass %>ApiConfiguration>(bootstrap) {

      @Override
      protected void configure() {
        super.configure();


      }

    };
  }

}
