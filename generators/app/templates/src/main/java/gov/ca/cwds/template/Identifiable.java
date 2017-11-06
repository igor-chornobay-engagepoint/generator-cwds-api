package gov.ca.cwds.<%=apiPackage %>;

/**
 * @author CWDS <%=apiTeam %> Team
 */
@FunctionalInterface
public interface Identifiable<I> {

  I getId();
}
