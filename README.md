# D3-Bar-Chart

### Objective

Visualize the provided GDP data using the D3 svg-based visualization library.

### User Stories / Test Cases

1. My chart should have a title with a corresponding id="title".

2. My chart should have a g element x-axis with a corresponding id="x-axis".

3. My chart should have a g element y-axis with a corresponding id="y-axis".

4. Both axes should contain multiple tick labels, each with a corresponding class="tick".

5. My chart should have a rect element for each data point with a corresponding class="bar" displaying the data.

6. Each .bar should have the properties data-date and data-gdp containing date and GDP values.

7. The .bar elements' data-date properties should match the order of the provided data.

8. The .bar elements' data-gdp properties should match the order of the provided data.

9. Each .bar element's height should accurately represent the data's corresponding GDP.

10. The data-date attribute and its corresponding .bar element should align with the corresponding value on the x-axis.

11. The data-gdp attribute and its corresponding .bar element should align with the corresponding value on the y-axis.

12. I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.

13. My tooltip should have a data-date property that corresponds to the data-date of the active area.