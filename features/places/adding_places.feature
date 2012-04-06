Feature: Adding places
  In order to improve analytics by having more points of interest
  As a standard user
  I want to add custom points of interest

  Scenario: Add a new point of interest without any errors
    Given I have logged in as the account manager Johnson
    And I am on the Your Places page
    When I add the new point of interest "KFC Restaurants" at longitude 5.03432 and latitude 3.435435
    Then my account should contain the following points of interest:
      | Name            |
      | KFC Restaurant  |
    And the map should show the following features:
      | Longitude | Latitude |
      | 5.03432   | 3.435435 |

  Scenario: Add a new point of interest without providing its name
    Given I have logged in as the account manager Johnson
    And I am on the Your Places page
    When I try to add the new point of interest at longitude 5.03432 and latitude 3.435435 without naming it
    Then I should see the following errors:
      | Error Message                                     |
      | Please provide a name for your point of interest. |

  Scenario: Add a new point of interest without providing its coordinates
    Given I have logged in as the account manager Johnson
    And I am on the Your Places page
    When I try to add the new point of interest "KFC Restaurants" without placing it on the map
    Then I should see the following errors:
      | Error Message                                                             |
      | Please place your point of interest on the map before attempting to save. |
