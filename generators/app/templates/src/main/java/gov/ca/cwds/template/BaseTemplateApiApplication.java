package gov.ca.cwds.<%=apiPackage %>;

import com.codahale.metrics.health.HealthCheck;
import com.codahale.metrics.health.HealthCheckRegistry;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.google.inject.Injector;
import gov.ca.cwds.<%=apiPackage %>.inject.InjectorHolder;
import gov.ca.cwds.<%=apiPackage %>.web.rest.filters.RequestExecutionContextFilter;
import gov.ca.cwds.<%=apiPackage %>.web.rest.filters.RequestResponseLoggingFilter;
import gov.ca.cwds.rest.BaseApiApplication;
import io.dropwizard.setup.Environment;
import java.util.EnumSet;
import javax.servlet.DispatcherType;
import org.glassfish.jersey.linking.DeclarativeLinkingFeature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author CWDS <%=apiTeam %> Team
 */
public abstract class Base<%=apiClass %>ApiApplication<T extends <%=apiClass %>ApiConfiguration> extends
    BaseApiApplication<T> {

  private static final Logger LOG = LoggerFactory.getLogger(Base<%=apiClass %>ApiApplication.class);

  @Override
  public void runInternal(T configuration, Environment environment) {

    environment.getObjectMapper()
        .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, true);

    environment
        .jersey()
        .getResourceConfig()
        .packages(getClass().getPackage().getName())
        .register(DeclarativeLinkingFeature.class);

    Injector injector = guiceBundle.getInjector();

    // Providing access to the guice injector from external classes such as custom validators
    InjectorHolder.INSTANCE.setInjector(injector);

    environment.servlets()
        .addFilter("RequestExecutionContextManagingFilter",
            injector.getInstance(RequestExecutionContextFilter.class))
        .addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), true, "/*");

    environment.servlets()
        .addFilter("AuditAndLoggingFilter",
            injector.getInstance(RequestResponseLoggingFilter.class))
        .addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), true, "/*");
  }

  private void doHealthCheck(HealthCheckRegistry healthCheckRegistry, String key) {
    HealthCheck.Result result = healthCheckRegistry.runHealthCheck(key);
    if (!result.isHealthy()) {
      LOG.error("Fail - {}: {}", key, result.getMessage());
    }
  }


}
