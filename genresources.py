import random

categories = [
  "Personal stories",
  "Case studies",
  "Fact sheets",
  "Guides & Toolkits",
  "Support services",
  "Research"
]
      
focus = [
  "Support for leaders, colleagues and staff",
  "Assessment of organisational approach",
  "Improving workplace culture",
  "Developing policy and practice"
]

roles = [
  "CEO or leadership",
  "Senior manager",
  "HR professional",
  "Line manager/supervisor",
  "Sole trader",
  "Employee",
  "Health or wellbeing lead",
  "Champion or advocate"
]
        
organisation_size = [
  "Micro (<10 employees)",
  "Small (10-49 employees)",
  "Medium (50-249 employees)",
  "Large (250+ employees)"
]

industries = [
  "Retail & consumer",
  "Manufacturing",
  "Property & Construction",
  "Transport & Logistics",
  "Law & Legal Services",
  "Financial & Insurance Services",
  "Business Consulting & Management",
  "IT & Telecommunications",
  "Healthcare",
  "Recruitment & HR",
  "Science & Pharmaceuticals",
  "Tourism & Hospitality",
  "Government & Public Agencies",
  "Education & Training",
  "Media, communications and digital",
  "Occupational health & rehabilitation",
  "Energy & Utilities",
  "Charity, not-for-profit",
  "Environment & agriculture",
  "Emergency services & security"
]

directory = 'site/content/resources/'
      
# ---
# title: Test 1234
# date: 2020-08-12T08:41:40.785Z
# banner_title: Testing Banner Title
# banner_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
#   sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
# banner_image: img/bannerrightimage.jpg
# category: Case studies
# focus: Assessment of organisational approach
# role: HR professional
# organisation_size: Small (10-49 employees)
# industry: Manufacturing
# content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
#   tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
#   quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
#   consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
#   cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
#   proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
# ---

# category, focus, role, organisation_size,

index = 0

# 6 categories times by i (random)
for cat in categories:
  for i in range(random.randrange(50, 100)):
    foc = random.choice(focus)
    role = random.choice(roles)
    org = random.choice(organisation_size)
    industry = random.choice(industries)
    index += 1
    title = 'test-' + str(index)
    
    f = open(directory + title + '.md', "w")
    content = "---\n"
    content += "title: " + title + "\n"
    content += "date: 2020-07-30T07:53:59.980Z\n"
    content += "banner_title: Testing Banner Title\n"
    content += "banner_description: \"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\"\n"
    content += "banner_image: img/bannerrightimage.jpg\n"
    content += "category: " + cat + "\n"
    content += "focus: " + foc + "\n"
    content += "role: " + role + "\n"
    content += "organisation_size: " + org + "\n"
    content += "industry: " + industry + "\n"
    content += "content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n"
    content += "---"
    f.write(content)
    
print("Done: " + str(index) + " pages generated")


