package gov.ca.cwds.<%=apiPackage %>.inject;

import com.google.inject.AbstractModule;

/**
 * Identifies all TEMPLATE_UNIT_OF_WORK API business layer (services) classes available for dependency
 * injection by Guice.
 *
 * @author CWDS TPT-3 Team
 */
public class ServicesModule extends AbstractModule {

  /**
   * Default constructor
   */
  public ServicesModule() {
    // Do nothing - Default constructor
  }

  @Override
  protected void configure() {
  }

}
