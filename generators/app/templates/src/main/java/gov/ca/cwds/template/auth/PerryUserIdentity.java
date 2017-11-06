package gov.ca.cwds.<%=apiPackage %>.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import gov.ca.cwds.security.shiro.realms.PerryAccount;

/**
 * @author CWDS CALS API Team
 */
public class PerryUserIdentity extends PerryAccount {

  @JsonProperty
  private String staffId;

  public String getStaffId() {
    return staffId;
  }

  public void setStaffId(String staffId) {
    this.staffId = staffId;
  }
}
