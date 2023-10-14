/*jslint browser: true */
/*global $, module, strictEqual, test */

"use strict";
var dutchlanguagearea_filename_png = "be7e8152aa5e38b35d8e7747d6e34120.png";
var imagemap_filename = "6d70338b7adaf443d2ce98dd7602ebd2.html";
var expected_data_uri = "iVBORw0KGgoAAAANSUhEUgAAAfQAAAHCCAMAAAAuK8sIAAAAOVBMVEX\/\/\/8AAP+lKir\/\/wAAgAD\/AAAAAACAgIAekP8AAACAgIAekP9\/f38fHx\/f39+\/v7+fn58\/Pz9fX18dP5m2AAAgAElEQVR4nO2d6batKg5GrR9njyHrtPf9H7a2DdIFSEJQ1HxV92wbRGSu0ATEaVKpVCqVSqVSqVQqlUqlUqlUKpVKpVKpVKpnaP7W1WlQnad5B34B9q9QZ9\/+pXIGfomhf\/3PVwb6H+j477\/H5s9j7+evX3+DU6pEnmlfVLajoEP69esI\/N9fu\/fz3+\/fv\/6sR1SwPM6XVeds6M78\/\/479hYz\/7ns\/votndCHaADkGeg\/f339+ub46+vf72+aP38tRLe9\/dSiA\/q\/v3bv99d3iL\/L+Z\/\/nf8o1wnGNwNNc1eV05AbYxjpygmCvrD7\/t\/Xn+m\/\/75pLv\/Zve3UKgt9Jb3tuX\/+\/hJM4+iaA+qz1X4uDjuRjXwjLsgdhv7dMlu5fQP887VYu93bTq2y0Le\/EXSw6fdUzQ50bMGJRc9EIzc+aynsYPH+Z2mD\/9z6cGvR\/mX3tlNboMPSjz1XvL8JeoYhVLoTjTw1bhlzzzTkfv6yJfQO3ZXXP+M63RXvriH3iuLdeleyZ5qU4yuAHSze\/0x\/v7d+Ld1vC33f208tAhpy3z+Ircs2\/fczvdWz5IB7vW6wiGfIlCx6bqYOQv\/3tbpYvv\/8O6Bve\/upaXflrVtLl83ubc6Z6ffDu2xBM03at1YtwrtApyp1xfx7snPGWfJOfp7EkBdN\/EhAK3UJ6FOM+MFu2JX4fGx5B5uFAr6FbLyTCPS3aIc7tzXUjm63CY4RSLaauo6yYeWV6kzgZtN0VNsQflxMvASoKJp94izkkZPFAJuU9Cj1vpqbK+\/ElBm2HUfZdrmqoKDuZhEH+bZDV1Pvo6ixxiSeOcFKkWwMU6UJB3nS\/9uGWlfZmTN\/1rbgIzpsIWOmkedP0WOTjuHr68ePH9SW+8\/f03\/\/ts1j5sz+43jCvJlWIy+7yAX85629th+byP21P84NGw6oPsAJ2zjDpULVXN2Us8w96qiZM5MdenEDLhb6A+bNMGe4bEIBbTX2putT6LiZM9+0f9rQB\/RfK+4nDKzy3W4nOVNbLnfMD+q4mTPbwHkwc2YZi\/tvesYUCr7bjRC0iXvDxQB03MyZv3vN\/duH\/sLJUoGoGFuoN\/xkIOiYmTNuyNybOfPGaZGe6Bjainh+UQHU6ZiZM\/+Oxpo3c2bvxj1\/3gwkDoHmrtt+U2o8AHTuzJnfWwv\/6fNmQPGMTsCxtpi7YVNnV8SxM+bR82ZgcctZGRf6cndqClgeOV8h5Hu7YYUdrt2uBOIihtfpE5uWnjkZegs40cEyHXljaJ3+Rrb0i3pdYHSisb1BG3LyZU3MG66FI1TsJDGRX+VTOzHK52qe6JX5pe7zM+N8ppb22zOYaxGPFdPMh2TeM+In6ZKivScbpV7TfBVzhX6ZMm+Y13T5JLfL4n6ALmOu0K\/TM6Er9ZKuY67QLxMP+vDMFXpBvAViRHJUDf1WEpr4kDsusWqYQheW3GSX7PFW7spcWj0L9wO2Qu8l3vsrIrcGYwkWoZGOXLWKNbLWk7nUjRR6Xhyfu1B+QtHExxpmW3IvfL5YXfR+0IFFSgRjV63yV\/jE60zo7Jsp9Izm4A9aCv3OmqO\/OEllJ5Kw68GRbqzQYc3AFkInQz+O0t5VU+igZnCzrougG+KdlTqkiw0diKnoojNEj7xCB3S1oQOVdHb8xYXF312hp7qe+TR5S0IXow7WEUbHzU\/WYzUE9DBOVNQKna85u1NRl7zcxlJlE6DQYyVfx8OqU1ZSVo8U\/nG8Rmzm3aDLB1bokebCXln9LJ0UGhOIm5aHim3oc8d19WnYRYK8SXzmnV9JkXW9KHVfXOhrwFFeRKqHVeiemMz3aVWjQK8HVuieeK04G65jVhKjrgVX6E4sQ3ezJ8eBXguv0J04hu6HGqT9vl7QdPpNYjhgw1AdqcteoNAP+SMtKOZxqIEK+PIFCt1pTjZwwQ8NZOrFKxS6E2k6JFQY3MTUlbknysRnMNBI0AutP4XuiQAdDjOMf6Z8iUL3hV3qORema27KVesKPRSq2Z4NMxj08mx5FUGF30Xf7JSirtDJKhUFCv2ZKhb\/w0GH34FrTcjzVJiIaGpV\/mh1OniVMk+VnXNs6u8JKvR7yhz\/pCduyBy4TqEnyhi6QTAfE3rsmVPmiTKGnrX\/NFQnNcQdUlfoiUC6+xvBZ8849N5hlFsjUpmngvL42KlmvTD049\/WeBV6SQBfykKNojlqjr\/KvKv87DHxkWSvcLVkUprXfVboRYXFukny+7xJSJKRGWBLZZW04GoBsOeaUyIUmUJP1dIpU+b3FCJPTqEu\/d10oXXin6lBoHdAAzVKVavaoEvlaQ80dsE5VSJMphSpS+RqHzIGMUb4SqEyhdxTJ67m2IsMZsDojRKAHi8GZShLgqGG7LmS+LTXEyUBfQsTLd1pcOuC0X4gVClzULhsQYaKBuBNBrw7SF\/jlSaFDgmZK5Sy2t+E7NhvVHfuSytzUNhsoVeO2QEPizsoFjo137vEenuhoTdFbNLtoxzg3oCcCJXVWdDrs2F6NLQVOijpOh2+wH4itwxWHpFCh3SOoQt2DJtSoVrVC3o6Jp\/OzWi+CSMZqulE6FN91pvW6ScJ3\/+WiLZo613G2TrEeXtRBkVE4s3Hol22s0TJFJkfSK4B32dkRKEDkjFfWkjoZK\/BMIUOiAwdNXJGbrAp8xNFzBTnVWtzsgDUaQnBSqED4meKQr+tLoJ+GnWFDqghU5p63Ar9QlEz5ctKod9W5Dz5+t+mZugnUVfoqS6DfpapK\/RUDdBbx8XPoa7QU\/Ghl69kQddBtlNEzxKveG+LGHTFTuKuOYWe6DroINvNzyeKXaEnuhB68WTRv597f4KXkPeJAd3105siZg\/auIUGLpp0d3sVsyTiG+xKzHVjTZjzj3k\/HLPvJ78lhR6rnCNRSR7sto6tbmFq2Ou9OmP\/RO\/G2V19ZTURFzomK0UK3wzj6Ehi3eYwfEwiXiNM1Rx2yY3bFaxMidRB6EoWKUwj3Kf8\/X9ku\/0QpjSgVutJcF1chCAS9C2zqdCF6v0g5DlevKeKCB17SajiiAyywjVbeWDy65kodayug751q\/CkXCs88zNR6FihoBf66SjNBtByQh2tlwiEnsHKztU5+bCXDqNdKRg6bP68bJ1n4Ku9Cv1KgUadK\/Pp+erZeIBdp0lcrS23PPwpdHo9vio0b\/cL+Hy2\/2SlfjeCduiONACd3GJflH6ic+duvpGLQ1dvK0F7TslDhz\/Lutbx6z1lqStwinpBL3yKd97uKUpdoVPUB3r588vS1LVoJwqAnjTbqNArX9ye9gJejLoSp8nmV5ErDXoN+eRMXYi6QqdJHnod+QJ9DbVDb2\/KK3WSDuilrjipn46Bbk19w67QTxYtuxChUcw96AtxhX6uLoNua3UR95xCp4iaW9XwSOah11Shnyph6IiG+xZuna7sYjWN1bpCpyjOrWqTrZi9SOR7Rz14SUWhn6cEeq1zVsherJlP1jtzvKIwLdBbwCl0gpLMqkAveTvxyA+PnPHT0GTr6obFiwi9lLME5h50z2veONyq1LFKRipqlp6LiFC0T66XHty8dYw9eo1xgvdUiwjQ82UoCflh6LHa6nVvmrRJDqp8RVlSgi5k5s7QE7X31+3kandETT0VAXrOaIjIs4YuOXHuqLcUeipaPx3KPqqZFwxdeLakSe1etajZ9U5GXjD0HnNkFyn0QM1eWDrzgqEr9FPUCJ1etJeZK\/UT1Mqcfsd5VugXqw06udW+vutQvqfpRF2xHyJmRRCc3DnfXm6p3LITdDV29rtpfsaxkNezvhdzhc58N43P3CKv53w36EqdBd3LNWLRjkau0DuKA91nTroZtmRf1TjkUpBCJ0IPR2C7mXlP5gq9cS04yhwZkpl3ZK7UadCTmRb4+Y8kM+9Yoa+p6Bn5DUQv3oNdLPQ9HDq3FXpP0fvphtFfozLvC\/3tzBeR88D\/rAruHUXyjbq544jpeKrKwx6wPOzznK4ImNxiu4hyg47QlXlLHrgra9xn4n3U0PuqZdQp6LKXuFeH1OKIFXpPmUbs\/k4ee2leFBitlu49tc8PJ3zXLLr+iGD5m6FONfSu1BW6yWxTovBX74aNnWroCr2rvBxon1KSM3a6oesYW08ZcJMd22rsyWG6oU86h6KfyKV7reaHqHMMXaH3E9XQd6cM\/AHkI5J4nW9WPiv0TqLV6N5LYSB01wc4mnP7rFdePuu8yC4iGXqlKjgOreBnCxzzseSMdDZsD9FqdCz0dccQx88hKfQeIpXuplIshMfsh4yZKdvj0JdcxIU29MRfVzP0aWJ7+MJYAOoN3kN7eVOabi4s9Dri9IhMzgLQTTZNmPjeDXxCM892z4oHZDJ3+ayPM83g26q8gQKRVN1YJrvj9c1yHzNNPkpfjJ2v3dRtke6lh3OD1zPPQfc\/VlwqDE1hDzrAVLYtxymoXw89bXhNngVvO4VcMmF7qhv0Qr+Nfou3Q4caZ8a3993WkdFUG3ZsFXpt5Fu8HDq2V14Plwsm1U4u9NSpt3g5c\/TzV\/O18NsQyeOyd4Z2i5dDt4+PeNOhMpJagn4O9W3gD3Gvl\/fRj6fHvNNUdNsUKwGZTC5S3\/tx9mZ5rq93y7jHR73IVnTcFHyiUpU60v9eSsvbiQcwcG8vMrPsZOilu76eOR061+cpMrZBXfkd5TR+nfwcQEPnD2pxL7Sijq4qdEBBBrwDujIP9roW782XbqJRV0MHFEGv9tO3erkl21qznAg9KZS05U7NgL33ex\/okxuH3bcbb39\/XTBEIVC8sybKHV6bt+uKwcjmjOd+rkuJr7pkskl73nOht973GeK5WBrvKZD3LOjKfNUlzlTbnmqIQg2dL2YutGWeHYVjx8L9\/qYyX8TNhcuhs26rrbhVF0Jv8e6wqnMlvuki57l1k3Bj0eq8Qfx8aHtzrDEByrxBrflwEXRtw7WoyXcu0ipiRKHt9iY15YNIJnJ+N1zo2nRfdD3zMy19vdvrsbcxl8q+c6m\/HfsYzM+G\/nLsrYW7UB15OvQ3Y5cYJZNpyxHCbriL0FFfnXkpdoneltD6MeiQ67SJytyJrx8\/fqzUy\/BfCb3fzJfPhzilhQK9Ol9mYb5SP+A33\/U56udKI0NHf24TE6mFfsDP3hSXtgfIW8RVIDLwaL3S3X8X1Zj2kEHEVSn0WPu85Y9QXZzG4hiVEJkEOpSez8cvM9Blx5cr3RX6IvugQotsRvn28VfvdLC8m2075mN3oKg+0ZUfREUeaG\/AaZ1udTypDHYTsAoW+XLIIuheYZBC\/3hy1\/CmRuVa79vx9zD3H1WG+h4XZImud\/Vx5MKAbtvYWD5JQ3A9JJHYTXsJ8E7oMjlptpjAuMxxfIcJZLQ9Zkptfu4cSEi2rn8R9PBZGzNzudwUIgnuZfJA9xKgeCdeCgHt0N\/EfAGRKWDJWmktFprJQGy+7tDLQYhpy6vaqn+gjGsnHUUvM6oKK0K3sL5kvzD1dzEPmsdQK5oQTyWEaAEq2pLDDMg8SkH\/yW3CQUvVcJWCbK0pSP1V1fkmv2c9gdvuWEtjWjhrqe58QHai\/fugZ1vvdqD641f6H8ioUZkvn7NxMmh3OD71+0LmUVYFGWl9Jx7qGDqqXAfuk9UnUjmwHz\/lLbhXknZKHj7I5nIljuGSvU85Tlz03sndbHFpeTXxCYKBgkgCPtXzOVdxVG5xnDXR31JK3o58AqljUEqszoiLzvMgpGecq956byvJUOKLcgPXteuI1IuZXYsrTI\/di4oGR11XeK4qS71WshKol3ObWLQ46OBgbDITSHRy0FOUn85YuopQo9crdEQk9nbOypOLw9sYfyP3Iff3KpsbzaaOWjgU\/ePxi3OvNk9ac9Gemrkv+7161CxE8GzlBpuNiUEHg5oVu1lTGlHXUj3RgvygXpiynvfAyAyxtHlTvZk60Cd2W5cofpZ2K1\/\/lLMm7yup4SJOXne1NqWJGCQ0\/X2SHHXPli3Yl83qx\/So0I+gnhXmk+Izhxy9ZcXTbz9xv0MbcJtmD\/mUNHgCQU6y8KzfWz6y3EJ3GKF4vdly24a7HwJ7YVWjqPeu0KeQeHAENJsk8z\/h+ZS1Pb9Pg0wG6z5BzKtdHrvuTxl7pXkoOcXiCUqYe8fCqbG5bIeqXrg+9kpaqIrYfwEZxmXohXO1a1+oA7pfyiedt1o9DBT7YMFQtteiPVdMvXBuu7oS4FVa8c4bcc\/qd+xbXtZ8sFno5NGbykBLXoih2mqI92ienYkHRb2jjrCStCzONqrYlW\/5p1elrraeEUwdk13RXIsCglKjrFoOFM5rAc9VxtbrInhpMr2A+oUT1LZwJYrIOM4rFVJf96jO04ZJF3Tort+t5TtbM7CLoU6FDofC\/V5c6O0ngKSeOA5UViB1zDRGaBN3AfFK25\/\/RNAxtq7QYUHUKWVnpX2eXuCOYHl4\/juCpbvLsQGfpvlQegraxbSNrQ8WC90ZHt8EN+qGNHj2RluPUMdumcQxi6IeeNERifCd8y2Frj9NBv\/qM+9e9xVk2t\/HitQRzTkiPz9UEwMHHW3sL2SeO1qiHjbi4SYYhbpka8pGhX+lRaHDZ4rUAbCfnHLnBJ7Eu7W3i6D+vgZ8Hnow3AKfXHMUIOcfMW5I\/RNs9iDu7m831dYBFaAjqSf87DY0d+Ws7LX30bYcpDrYfTNbwsPl+MXvAfqNeNoFr9AxjDqXqQP1+jpTdtkCmPdIKkVq6kXtsyaOzfSk3QaN3Wydo8GYq6mXNXs4M4X4lDu9U182RyI+saC\/i3rRnOci9jl4+3Ogzg8H+t6h7JSikQU56HJ780zwcJ8szzWHvcD2QN4HHpwCDWJf\/g7L3K+j0R0J50fok6ZxBfbc5yDj5r0dMPIbQaFfjpZQhb4dNOGKaq67NqrSaVTsa18geEh9f4nRBz808ymaG6HQa4q5B5X3fd7lJw68eBe+EfoE+OKOiWdm\/+\/8NJHlsaMk963MffdsMFPG\/rkDc4+6GjpK66Qpv5w3+XeThhXZRRNe9XiZeCT0AL4fX7+hptBvK\/\/VHxPSjm35aLaZobysSCl0q81szZSpmU0U1NfdsuPDqtTv9pR1eTYNZ4QBNzfdLjtaTP1+BVtGmJZYeWUhydT0F9fUrRO+Q5LOFq7xXfK53S0b2ND3cVb5FJ0t7HMXqN8tG\/yxNtJl3qtxtxadOVA2jJ0NYWrXVgvPP7Nr7KdFiMM83R27nnO9T\/t5Le+TrXTqQz8rRuhHjgOG+4ND3\/71OiarrftvOlE09LMihGeevKMQU5dKUgfBT\/l5KXTy8\/rY70M9+5g86nfvtNErtKCI9DRyPuSf8lM+nb1s4IdFiNF49Z13rsgfOR8KD8mkfvO1SThdlrDHtnWBRs6F0jN+KuefKdYTRx31Zaht4EH1YsqUetNVw2IvQ1fqbRcx2oWce4ve5aXQ5ahTIzrr+zhV6C+kfpWp755Rzt2JKrXfXwqd14THH8x9uLZwkTAENfVUYtBTF\/0x0lEICp2ThaBNOUCdTL30tlNp\/tVkhIv9OnSlzr8mN+peYp45eRZ07rjLA3TUu9mP1YXB1h3gvBcSPg7sZ34Rghi0Ts\/Jm2uQDTFN5TI7MxxDY94BemHM5b2GHqncSgM+iJJOmC9wLRcC5WY9UwodoUorzS\/Fj\/ebTC50xbKz9f0ptbpCdyrW15i+dZ5zDXqpL8eWQscorQZboHtj72ElALzU3gV6Nq7XQgeWFpkS7OWmWXwo0yowaX0eHyp3D\/iCI6MuHPoQzXZVqFQgxuNVZXdm86UgoMN38Gfg1IoTvhS61VxYC3QCu2duheDjdeUdea1RDinGzfnhYFWk\/h7o5cU+VyUdb79YCCrk2F9Ozkbez4YSP6R3mTqwSBi0bli0PMHs\/TtFRUGhz4ZS6\/XE+Dd9Pl9fXz3uNpgMjHdV7vhxPvgTxioN7RxT\/\/rx48fXw5mv67AXP9dR4J75iLqNOWqet2bkKXX6wvyb+pOh45b4y2Cfk2Xkorjt64HHEWry4hgbr8fEtkN\/rKl7CwfVggLUk0XdwzXl3DL+Y0LPjbk8G3rh9UNA4Oca0jD7mnJz8N4q1OfmSY5E3g271ekPhJ4MkiMecQ6q9\/I3Geforb70JVeehEh4Sdma6k6f\/dDTmAO5j3rE2S0PWWrbbf\/2WYBHBIX\/+LtZW\/EWnxldGXujPWKtG\/etT6c1BNu7fcHz2wrcire22NjKFbBd3B7DmTpQw0TQH8g8X6l28XoMZeqZEi4D\/THMi9MbhW+1Ff\/jQM8\/+9ejDb34HH1cXX1W5QCnYqHSA8pvvT\/N0MvPAZ5l97HsVb2WYsmvUlxOT00PY17NofR8sM4a7WbHVt8VeLApQwb7sFeXGlKI3IlDNMxR8gZvOi+Wi5yWgYztURU6dXnftMak5YIfeu4JPZss1tSLR3llGGVg6q8j1J9R0POh2+9ElUPFehJzNK7K6AuybgcWBu4GHU5PPLaDe\/4neV9JLdxqLV7lDpw\/Cbp72TI+jcmBYGSoOV3XitTuxpWJ5fdXgYP9WnLer9QW6FBdToR+e+b04EcvLX8t8efQr\/1ujvHa1MptgAkNfXfR3Jw5sXt9TFmvXFdoPMEn5k7UEY9nkOGW+a+PmDfBMHN+wHLB8OnyfXlB6Bvz28+QInvRmqDXvPpd5lP0gH5v5v0uyblraxdcBR3F\/AmznjlpZ3Xngf1cxJdARzkX1kLo7u838EbGKC63vcmMy9MthHxbDucqwhn6dPO5kEzk9KvQQ1ymjysWOdhST+b9O+nMZPdcjrUTdPSYQi3c7d1x\/ER3xG66ueSaw8WdyRtCbwLX7XnPHnEBwuUCpg6EjHNvWDUmtCP0XtQpo0lHA9QeWlpuacoOP7RE+rqrOZk3hE7rcoSXrH20I2VucqS5D3KB8qjbk14xdaZ6STjd3ZsGHS+PNKxkfprvgL5fE0CPX226A3WZNN6wIceF\/m0kRejjt+OkEvga6GuG2bHUtTJPoA9u7GK\/yX4\/7sGgb9pXkLLo78RcjlTHAq3bWy4Nad7TdJh4uDDByKW7YNo6PWWX2ROb2lIcQxeMuqskf47iP+2PJ+GoN4kwh6GPy1wUk\/hj9uXd7j1xTpk7MZ8l09bDzoVj9CSQWC958SpD4zJfVnwZ2dJHeFO1qGwCB23C7cu0yYKS9TYPbudTPoVDIvcXaZVNoCT1jgMsQnaeSeGIzMN1vIRTeAfoUmaegT4g83jpNukkjk9dKIU5Mx+QebIsp3ga5Z66w9RXwUHu25j5ot7Q5aKUhi5rhGDqhmSerrPfI5nlODHuli2IMHXZR4USNxzzeQa\/rCCfzloJWoS+nTz+le1R2r8CZbz\/ECbZGEW5pXc7QC+eLZuw87Rv\/4+\/7sNNkv89RlNPZF0OurHfghqvCZddbvnsOr0IfaPtW7uzTn4S7BqBwZxGmaGWI7YRp8Tll9g+u06vQPe3fegTflXPsGjwF5gIcDc9eFq234n56aaeQt\/M2p3MxmVieyqtOG\/sFUn4PtDH07jQbQW+Q6\/FFS9Y5hcEYe0PtwSO7z41NhNuAL38\/QT5BggNut98q8WVfJzNld1iKcTo9tDPbcDvuWWbbHYv15EDjNW2zPZdA4biJxCl8d9Lrn4o5Tz\/u2\/iqEkSYAkdWDwHenPhptAJ0QXN88a4jiDksr39eYd\/L7n+RSTpQfXsGYpfVegDbFDM7VF4a40o9HJ0JF96v7yUgL78Y6dDSnQHhIVgLpzDhZf3CZGIJKVT1AfzfX1I64cdBj0GepdxjVDUucwdDb19tGX910GPnAfXC8W8P3Ty\/PVumScywrb8GfcVh9PtfIKb0+Sh8V65J8Lc2HbcmNPdr4AORMh4b6FP\/knEuo\/6jvtey\/lNdzBCxhyYcaFPjnlMfQjoiM8Wn9Nho5g6z7OKjFskliz0IWZSnN9fa4duWJ5VdOQCKjTkRjD2YaATsGMnS7CU+2YHSd5r6QnzAYz9ptA76hh1598GWDYuvgc7bgldAj3jl0JCPyvHuN4zlMPhSuqodtxZ0+Sw0IVTUroV416oAutSS0cxPwU63iN3ZobR74V7iPcV72CUlB6baEqEbxU8R7ZOZyZHSBdBT+284eJe4tTpIXO49a7QV5GcsKflGOdG\/oNk+uncqOV0UaWeQOdf20\/0GxmDhP5K6lHJSZslJZwWuRuZm1j6de13P8oRS3fGfcxN6vQxqI\/YdGcU7lP8JIO23qfrem1HnE9pxqXQ4WCX+94ntKnLp3WNjzw1btzifX8e8Xi7CEd9kgdvODNmFLqI0NAXSabZsBaNOWu8hXfFXaCTqGfSzJrRPTR0+n1wX3sdBXo7dZM9U9TIzFm+GXMj6BTqUKJNBB31YMyFu9szDVkqMSy9Dn2ElvuhzHpikEDq6z\/m2MM8Gg86P9P25BnkUk9kPFv4XNfcDzOU+H6aY2KZmeyCP7Xn463718A8NvFiVJwPvS\/\/ZJ1w9VteJSZ1cxhRYO5FcWrzph5jmmpS6Frs5mDuvr035ustiTjeuQyJ4hMSV783ybpRdKWXl35CpJu5H6MPfdj3WxKRqBdfvS09YGb5GGNyaz4JtICA68OKKHy3lHA7L6iDPo\/7+mKqKvWlwWezqRgwqUStPpk1XU2ykT3AENzVdN0OEzrFsbeMnvDrx1aoz77Re3k6JvUy9K2JP+9VeDmmo5lsIrv5uDVdwwuSjewBjvKRHOSJnU5g8GT\/tuocGL2fp0NSL0K3J+N+eUVB6Ww+4RlgJykdGDnlN9Pt2q+FwCb6HWOhxwd21PO++fUNfPmfK\/OG6qgfKlD3vuZDfgXkqDmD2tzktp3iU8jb+T8zvJMY0fcoLythoS9Foi3ov0vGw0UwJPKpQD08QW1Pb4GjFly03Bt0mcmfq9ws26ioXpnvkri6KuifHvIKdXeQNKJ1jZDQsY43F3oCm+21N8cYLfemlxALjdSgDkiaKqs+rvaipK0AAACqSURBVKPmsusG0HNpTA7TTT3rkSngyZlq4XhTGZpAT8si29oHrt6\/l77Itd\/uCx360gexVhcdYElKh2h1ULZCc95qsaivkf9hBSXZvKs5SWcoSeWVKQdcNbbEj9v+Ms0kv+noqm+ken4KtK98wJf\/VNP+m\/EqbedPk7xj2oXD6r7QD+pjFE1eCx8w570TLtsXMsxew42Z79SHIL7K9dlBz3yf3m\/z+4sj6P+AUVZxg291\/wAAAABJRU5ErkJggg=="

var expected_imagemap = "<area shape=\"rect\" coords=\"307,137,315,145\" title=\"Grootebroek (E038p)\" alt=\"Grootebroek (E038p)\" />";
var expected_svg = "<svg width=\"500\" height=\"450\" viewBox=\"0 0 350000 360000\" preserveAspectRatio=\"xMidYMid\" onload=\"init(evt)\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\"><\/svg>";
var expected_kml = "<kml xmlns=\"http:\/\/earth.google.com/kml/2.1\"> <Document/><\/kml>";

var dutchlanguagearea_json = {
  "action" : "inject",
  "type" : "dutchlanguagearea",
  "width" : "500",
  "format" : "png",
  "async" : false,
  data : [
    {"offset" : 1, "kloekecodes" : ["E038p", "E041p", "E056p", "E060p", "E064p", "E068a", "E075p", "E085p", "E093p", "E167p", ""]},
    {"offset" : 2, "kloekecodes" : ["L271p", "L290p", "L331p", "L375p", "L382p", "L383p", "M001p", "M006p", "M015p", "Q021p", "Q031p", "Q101p", "Q197p", "Q198b", "Q199p", ""]}
  ]
};

var stringtoXML = function (text) {
  if (window.ActiveXObject){
    var doc=new ActiveXObject('Microsoft.XMLDOM');
    doc.async='false';
    doc.loadXML(text);
  } else {
    var parser=new DOMParser();
    var doc=parser.parseFromString(text,'text/xml');
  }
  return doc;
}

/**
 * mock ajax method for returning a map embedded in a data uri
 */
$.mockjax({
  url: '/kaart/rest/dlamaptest',
  type : "POST",
  status : 200,
  contentType : "text/plain",
  responseText : expected_data_uri
});

/**
 * mock ajax method for returning an imagemap
 */
$.mockjax({
  url: '/kaart/rest/imagemaptest',
  type : "POST",
  status : 200,
  contentType : "text/html",
  responseText : expected_imagemap
});

/**
 * mock ajax method for returning an svg image
 */
$.mockjax({
  url: '/kaart/rest/svgtest',
  type : "POST",
  status : 200,
  contentType : "image/svg+xml",
  responseXML : expected_svg
});

/**
 * mock ajax method for returing a kml image
 */
$.mockjax({
  url: '/kaart/rest/kmltest',
  type : "POST",
  status : 200,
  contentType : "application/vnd.google-earth.kml+xml",
  responseXML : expected_kml
});

/**
 * mock ajax method for png file that is already cached
 */
$.mockjax({
  url: "/kaart/cache/dlamap/" + dutchlanguagearea_filename_png,
  type : "GET",
  status : 200,
  contentType : "text/plain",
  responseText : ""
});

/**
 * mock ajax method for png file that is not yet cached: request should fail with a 404
 */
$.mockjax({
  url: "/kaart/cache/dlamapfail/" + dutchlanguagearea_filename_png,
  type : "GET",
  status : 404
});

/**
 * mock ajax method for caching map file, will be invoked after the 404 above is encountered
 */
$.mockjax({
  url: "/kaart/cache/dlamapfail/",
  type : "POST",
  status : 200,
  contentType : "text/plain",
  responseText : "/kaart/cache/dlamapfail/" + dutchlanguagearea_filename_png
});

/**
 * mock ajax method for imagemap file that is already cachecd
 */
$.mockjax({
  url: "/kaart/cache/imagemap/" + imagemap_filename,
  type : "GET",
  status : 200,
  contentType : "text/html",
  responseText : expected_imagemap
});

/**
 * mock ajax method for imagemap file that is not yet cached: request should fail with a 404
 */
$.mockjax({
  url: "/kaart/cache/imagemapfail/" + imagemap_filename,
  type : "GET",
  status : 404
});

/**
 * mock ajax method for caching imagemap file, will be invoked after the 404 above is encountered
 */
$.mockjax({
  url: "/kaart/cache/imagemapfail/",
  type : "POST",
  status : 200,
  contentType : "text/plain",
  responseText : "/kaart/cache/imagemapfail/" + imagemap_filename
});

/**
 * mock ajax method for "creating" a map that is already cached, i.e. checking that it exists with HEAD method
 */
$.mockjax({
  url: "/kaart/cache/dlamapcreate/" + dutchlanguagearea_filename_png,
  type : "HEAD",
  status : 200
});


/**
 * mock ajax method for "creating" a map that is not yet cached, i.e. checking that it exists with HEAD method,
 * should fail with 404
 */
$.mockjax({
  url: "/kaart/cache/dlamapcreatefail/" + dutchlanguagearea_filename_png,
  type : "HEAD",
  status : 404
});


/**
 * mock ajax method for caching map file, will be invoked after the 404 above is encountered
 */
$.mockjax({
  url: "/kaart/cache/dlamapcreatefail/",
  type : "POST",
  status : 200,
  contentType : "text/plain",
  responseText : "/kaart/cache/dlamapcreatefail/" + dutchlanguagearea_filename_png
});


module("kaart jquery plugin tests", {
  setup : function () {
    this.json = $.extend(true, {}, dutchlanguagearea_json);
  }
});


test("inject dutchlanguagearea (png, data uri, non async)", function () {
  this.json.url = "/kaart/rest/dlamaptest";
  var expectedValue, actualValue, message;
  $("#qunit-fixture").kaart(this.json);
  if ($("#qunit-fixture img").length > 0) {
    expectedValue = "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAHCCAMAAAAuK8sIAAAAOVBMVEX\/\/\/8AAP+lKir\/\/wAAgAD\/AAAAAACAgIAekP8AAACAgIAekP9\/f38fHx\/f39+\/v7+fn58\/Pz9fX18dP5m2AAAgAElEQVR4nO2d6batKg5GrR9njyHrtPf9H7a2DdIFSEJQ1HxV92wbRGSu0ATEaVKpVCqVSqVSqVQqlUqlUqlUKpVKpVKpVKpnaP7W1WlQnad5B34B9q9QZ9\/+pXIGfomhf\/3PVwb6H+j477\/H5s9j7+evX3+DU6pEnmlfVLajoEP69esI\/N9fu\/fz3+\/fv\/6sR1SwPM6XVeds6M78\/\/479hYz\/7ns\/votndCHaADkGeg\/f339+ub46+vf72+aP38tRLe9\/dSiA\/q\/v3bv99d3iL\/L+Z\/\/nf8o1wnGNwNNc1eV05AbYxjpygmCvrD7\/t\/Xn+m\/\/75pLv\/Zve3UKgt9Jb3tuX\/+\/hJM4+iaA+qz1X4uDjuRjXwjLsgdhv7dMlu5fQP887VYu93bTq2y0Le\/EXSw6fdUzQ50bMGJRc9EIzc+aynsYPH+Z2mD\/9z6cGvR\/mX3tlNboMPSjz1XvL8JeoYhVLoTjTw1bhlzzzTkfv6yJfQO3ZXXP+M63RXvriH3iuLdeleyZ5qU4yuAHSze\/0x\/v7d+Ld1vC33f208tAhpy3z+Ircs2\/fczvdWz5IB7vW6wiGfIlCx6bqYOQv\/3tbpYvv\/8O6Bve\/upaXflrVtLl83ubc6Z6ffDu2xBM03at1YtwrtApyp1xfx7snPGWfJOfp7EkBdN\/EhAK3UJ6FOM+MFu2JX4fGx5B5uFAr6FbLyTCPS3aIc7tzXUjm63CY4RSLaauo6yYeWV6kzgZtN0VNsQflxMvASoKJp94izkkZPFAJuU9Cj1vpqbK+\/ElBm2HUfZdrmqoKDuZhEH+bZDV1Pvo6ixxiSeOcFKkWwMU6UJB3nS\/9uGWlfZmTN\/1rbgIzpsIWOmkedP0WOTjuHr68ePH9SW+8\/f03\/\/ts1j5sz+43jCvJlWIy+7yAX85629th+byP21P84NGw6oPsAJ2zjDpULVXN2Us8w96qiZM5MdenEDLhb6A+bNMGe4bEIBbTX2putT6LiZM9+0f9rQB\/RfK+4nDKzy3W4nOVNbLnfMD+q4mTPbwHkwc2YZi\/tvesYUCr7bjRC0iXvDxQB03MyZv3vN\/duH\/sLJUoGoGFuoN\/xkIOiYmTNuyNybOfPGaZGe6Bjainh+UQHU6ZiZM\/+Oxpo3c2bvxj1\/3gwkDoHmrtt+U2o8AHTuzJnfWwv\/6fNmQPGMTsCxtpi7YVNnV8SxM+bR82ZgcctZGRf6cndqClgeOV8h5Hu7YYUdrt2uBOIihtfpE5uWnjkZegs40cEyHXljaJ3+Rrb0i3pdYHSisb1BG3LyZU3MG66FI1TsJDGRX+VTOzHK52qe6JX5pe7zM+N8ppb22zOYaxGPFdPMh2TeM+In6ZKivScbpV7TfBVzhX6ZMm+Y13T5JLfL4n6ALmOu0K\/TM6Er9ZKuY67QLxMP+vDMFXpBvAViRHJUDf1WEpr4kDsusWqYQheW3GSX7PFW7spcWj0L9wO2Qu8l3vsrIrcGYwkWoZGOXLWKNbLWk7nUjRR6Xhyfu1B+QtHExxpmW3IvfL5YXfR+0IFFSgRjV63yV\/jE60zo7Jsp9Izm4A9aCv3OmqO\/OEllJ5Kw68GRbqzQYc3AFkInQz+O0t5VU+igZnCzrougG+KdlTqkiw0diKnoojNEj7xCB3S1oQOVdHb8xYXF312hp7qe+TR5S0IXow7WEUbHzU\/WYzUE9DBOVNQKna85u1NRl7zcxlJlE6DQYyVfx8OqU1ZSVo8U\/nG8Rmzm3aDLB1bokebCXln9LJ0UGhOIm5aHim3oc8d19WnYRYK8SXzmnV9JkXW9KHVfXOhrwFFeRKqHVeiemMz3aVWjQK8HVuieeK04G65jVhKjrgVX6E4sQ3ezJ8eBXguv0J04hu6HGqT9vl7QdPpNYjhgw1AdqcteoNAP+SMtKOZxqIEK+PIFCt1pTjZwwQ8NZOrFKxS6E2k6JFQY3MTUlbknysRnMNBI0AutP4XuiQAdDjOMf6Z8iUL3hV3qORema27KVesKPRSq2Z4NMxj08mx5FUGF30Xf7JSirtDJKhUFCv2ZKhb\/w0GH34FrTcjzVJiIaGpV\/mh1OniVMk+VnXNs6u8JKvR7yhz\/pCduyBy4TqEnyhi6QTAfE3rsmVPmiTKGnrX\/NFQnNcQdUlfoiUC6+xvBZ8849N5hlFsjUpmngvL42KlmvTD049\/WeBV6SQBfykKNojlqjr\/KvKv87DHxkWSvcLVkUprXfVboRYXFukny+7xJSJKRGWBLZZW04GoBsOeaUyIUmUJP1dIpU+b3FCJPTqEu\/d10oXXin6lBoHdAAzVKVavaoEvlaQ80dsE5VSJMphSpS+RqHzIGMUb4SqEyhdxTJ67m2IsMZsDojRKAHi8GZShLgqGG7LmS+LTXEyUBfQsTLd1pcOuC0X4gVClzULhsQYaKBuBNBrw7SF\/jlSaFDgmZK5Sy2t+E7NhvVHfuSytzUNhsoVeO2QEPizsoFjo137vEenuhoTdFbNLtoxzg3oCcCJXVWdDrs2F6NLQVOijpOh2+wH4itwxWHpFCh3SOoQt2DJtSoVrVC3o6Jp\/OzWi+CSMZqulE6FN91pvW6ScJ3\/+WiLZo613G2TrEeXtRBkVE4s3Hol22s0TJFJkfSK4B32dkRKEDkjFfWkjoZK\/BMIUOiAwdNXJGbrAp8xNFzBTnVWtzsgDUaQnBSqED4meKQr+tLoJ+GnWFDqghU5p63Ar9QlEz5ctKod9W5Dz5+t+mZugnUVfoqS6DfpapK\/RUDdBbx8XPoa7QU\/Ghl69kQddBtlNEzxKveG+LGHTFTuKuOYWe6DroINvNzyeKXaEnuhB68WTRv597f4KXkPeJAd3105siZg\/auIUGLpp0d3sVsyTiG+xKzHVjTZjzj3k\/HLPvJ78lhR6rnCNRSR7sto6tbmFq2Ou9OmP\/RO\/G2V19ZTURFzomK0UK3wzj6Ehi3eYwfEwiXiNM1Rx2yY3bFaxMidRB6EoWKUwj3Kf8\/X9ku\/0QpjSgVutJcF1chCAS9C2zqdCF6v0g5DlevKeKCB17SajiiAyywjVbeWDy65kodayug751q\/CkXCs88zNR6FihoBf66SjNBtByQh2tlwiEnsHKztU5+bCXDqNdKRg6bP68bJ1n4Ku9Cv1KgUadK\/Pp+erZeIBdp0lcrS23PPwpdHo9vio0b\/cL+Hy2\/2SlfjeCduiONACd3GJflH6ic+duvpGLQ1dvK0F7TslDhz\/Lutbx6z1lqStwinpBL3yKd97uKUpdoVPUB3r588vS1LVoJwqAnjTbqNArX9ye9gJejLoSp8nmV5ErDXoN+eRMXYi6QqdJHnod+QJ9DbVDb2\/KK3WSDuilrjipn46Bbk19w67QTxYtuxChUcw96AtxhX6uLoNua3UR95xCp4iaW9XwSOah11Shnyph6IiG+xZuna7sYjWN1bpCpyjOrWqTrZi9SOR7Rz14SUWhn6cEeq1zVsherJlP1jtzvKIwLdBbwCl0gpLMqkAveTvxyA+PnPHT0GTr6obFiwi9lLME5h50z2veONyq1LFKRipqlp6LiFC0T66XHty8dYw9eo1xgvdUiwjQ82UoCflh6LHa6nVvmrRJDqp8RVlSgi5k5s7QE7X31+3kandETT0VAXrOaIjIs4YuOXHuqLcUeipaPx3KPqqZFwxdeLakSe1etajZ9U5GXjD0HnNkFyn0QM1eWDrzgqEr9FPUCJ1etJeZK\/UT1Mqcfsd5VugXqw06udW+vutQvqfpRF2xHyJmRRCc3DnfXm6p3LITdDV29rtpfsaxkNezvhdzhc58N43P3CKv53w36EqdBd3LNWLRjkau0DuKA91nTroZtmRf1TjkUpBCJ0IPR2C7mXlP5gq9cS04yhwZkpl3ZK7UadCTmRb4+Y8kM+9Yoa+p6Bn5DUQv3oNdLPQ9HDq3FXpP0fvphtFfozLvC\/3tzBeR88D\/rAruHUXyjbq544jpeKrKwx6wPOzznK4ImNxiu4hyg47QlXlLHrgra9xn4n3U0PuqZdQp6LKXuFeH1OKIFXpPmUbs\/k4ee2leFBitlu49tc8PJ3zXLLr+iGD5m6FONfSu1BW6yWxTovBX74aNnWroCr2rvBxon1KSM3a6oesYW08ZcJMd22rsyWG6oU86h6KfyKV7reaHqHMMXaH3E9XQd6cM\/AHkI5J4nW9WPiv0TqLV6N5LYSB01wc4mnP7rFdePuu8yC4iGXqlKjgOreBnCxzzseSMdDZsD9FqdCz0dccQx88hKfQeIpXuplIshMfsh4yZKdvj0JdcxIU29MRfVzP0aWJ7+MJYAOoN3kN7eVOabi4s9Dri9IhMzgLQTTZNmPjeDXxCM892z4oHZDJ3+ayPM83g26q8gQKRVN1YJrvj9c1yHzNNPkpfjJ2v3dRtke6lh3OD1zPPQfc\/VlwqDE1hDzrAVLYtxymoXw89bXhNngVvO4VcMmF7qhv0Qr+Nfou3Q4caZ8a3993WkdFUG3ZsFXpt5Fu8HDq2V14Plwsm1U4u9NSpt3g5c\/TzV\/O18NsQyeOyd4Z2i5dDt4+PeNOhMpJagn4O9W3gD3Gvl\/fRj6fHvNNUdNsUKwGZTC5S3\/tx9mZ5rq93y7jHR73IVnTcFHyiUpU60v9eSsvbiQcwcG8vMrPsZOilu76eOR061+cpMrZBXfkd5TR+nfwcQEPnD2pxL7Sijq4qdEBBBrwDujIP9roW782XbqJRV0MHFEGv9tO3erkl21qznAg9KZS05U7NgL33ex\/okxuH3bcbb39\/XTBEIVC8sybKHV6bt+uKwcjmjOd+rkuJr7pkskl73nOht973GeK5WBrvKZD3LOjKfNUlzlTbnmqIQg2dL2YutGWeHYVjx8L9\/qYyX8TNhcuhs26rrbhVF0Jv8e6wqnMlvuki57l1k3Bj0eq8Qfx8aHtzrDEByrxBrflwEXRtw7WoyXcu0ipiRKHt9iY15YNIJnJ+N1zo2nRfdD3zMy19vdvrsbcxl8q+c6m\/HfsYzM+G\/nLsrYW7UB15OvQ3Y5cYJZNpyxHCbriL0FFfnXkpdoneltD6MeiQ67SJytyJrx8\/fqzUy\/BfCb3fzJfPhzilhQK9Ol9mYb5SP+A33\/U56udKI0NHf24TE6mFfsDP3hSXtgfIW8RVIDLwaL3S3X8X1Zj2kEHEVSn0WPu85Y9QXZzG4hiVEJkEOpSez8cvM9Blx5cr3RX6IvugQotsRvn28VfvdLC8m2075mN3oKg+0ZUfREUeaG\/AaZ1udTypDHYTsAoW+XLIIuheYZBC\/3hy1\/CmRuVa79vx9zD3H1WG+h4XZImud\/Vx5MKAbtvYWD5JQ3A9JJHYTXsJ8E7oMjlptpjAuMxxfIcJZLQ9Zkptfu4cSEi2rn8R9PBZGzNzudwUIgnuZfJA9xKgeCdeCgHt0N\/EfAGRKWDJWmktFprJQGy+7tDLQYhpy6vaqn+gjGsnHUUvM6oKK0K3sL5kvzD1dzEPmsdQK5oQTyWEaAEq2pLDDMg8SkH\/yW3CQUvVcJWCbK0pSP1V1fkmv2c9gdvuWEtjWjhrqe58QHai\/fugZ1vvdqD641f6H8ioUZkvn7NxMmh3OD71+0LmUVYFGWl9Jx7qGDqqXAfuk9UnUjmwHz\/lLbhXknZKHj7I5nIljuGSvU85Tlz03sndbHFpeTXxCYKBgkgCPtXzOVdxVG5xnDXR31JK3o58AqljUEqszoiLzvMgpGecq956byvJUOKLcgPXteuI1IuZXYsrTI\/di4oGR11XeK4qS71WshKol3ObWLQ46OBgbDITSHRy0FOUn85YuopQo9crdEQk9nbOypOLw9sYfyP3Iff3KpsbzaaOWjgU\/ePxi3OvNk9ac9Gemrkv+7161CxE8GzlBpuNiUEHg5oVu1lTGlHXUj3RgvygXpiynvfAyAyxtHlTvZk60Cd2W5cofpZ2K1\/\/lLMm7yup4SJOXne1NqWJGCQ0\/X2SHHXPli3Yl83qx\/So0I+gnhXmk+Izhxy9ZcXTbz9xv0MbcJtmD\/mUNHgCQU6y8KzfWz6y3EJ3GKF4vdly24a7HwJ7YVWjqPeu0KeQeHAENJsk8z\/h+ZS1Pb9Pg0wG6z5BzKtdHrvuTxl7pXkoOcXiCUqYe8fCqbG5bIeqXrg+9kpaqIrYfwEZxmXohXO1a1+oA7pfyiedt1o9DBT7YMFQtteiPVdMvXBuu7oS4FVa8c4bcc\/qd+xbXtZ8sFno5NGbykBLXoih2mqI92ienYkHRb2jjrCStCzONqrYlW\/5p1elrraeEUwdk13RXIsCglKjrFoOFM5rAc9VxtbrInhpMr2A+oUT1LZwJYrIOM4rFVJf96jO04ZJF3Tort+t5TtbM7CLoU6FDofC\/V5c6O0ngKSeOA5UViB1zDRGaBN3AfFK25\/\/RNAxtq7QYUHUKWVnpX2eXuCOYHl4\/juCpbvLsQGfpvlQegraxbSNrQ8WC90ZHt8EN+qGNHj2RluPUMdumcQxi6IeeNERifCd8y2Frj9NBv\/qM+9e9xVk2t\/HitQRzTkiPz9UEwMHHW3sL2SeO1qiHjbi4SYYhbpka8pGhX+lRaHDZ4rUAbCfnHLnBJ7Eu7W3i6D+vgZ8Hnow3AKfXHMUIOcfMW5I\/RNs9iDu7m831dYBFaAjqSf87DY0d+Ws7LX30bYcpDrYfTNbwsPl+MXvAfqNeNoFr9AxjDqXqQP1+jpTdtkCmPdIKkVq6kXtsyaOzfSk3QaN3Wydo8GYq6mXNXs4M4X4lDu9U182RyI+saC\/i3rRnOci9jl4+3Ogzg8H+t6h7JSikQU56HJ780zwcJ8szzWHvcD2QN4HHpwCDWJf\/g7L3K+j0R0J50fok6ZxBfbc5yDj5r0dMPIbQaFfjpZQhb4dNOGKaq67NqrSaVTsa18geEh9f4nRBz808ymaG6HQa4q5B5X3fd7lJw68eBe+EfoE+OKOiWdm\/+\/8NJHlsaMk963MffdsMFPG\/rkDc4+6GjpK66Qpv5w3+XeThhXZRRNe9XiZeCT0AL4fX7+hptBvK\/\/VHxPSjm35aLaZobysSCl0q81szZSpmU0U1NfdsuPDqtTv9pR1eTYNZ4QBNzfdLjtaTP1+BVtGmJZYeWUhydT0F9fUrRO+Q5LOFq7xXfK53S0b2ND3cVb5FJ0t7HMXqN8tG\/yxNtJl3qtxtxadOVA2jJ0NYWrXVgvPP7Nr7KdFiMM83R27nnO9T\/t5Le+TrXTqQz8rRuhHjgOG+4ND3\/71OiarrftvOlE09LMihGeevKMQU5dKUgfBT\/l5KXTy8\/rY70M9+5g86nfvtNErtKCI9DRyPuSf8lM+nb1s4IdFiNF49Z13rsgfOR8KD8mkfvO1SThdlrDHtnWBRs6F0jN+KuefKdYTRx31Zaht4EH1YsqUetNVw2IvQ1fqbRcx2oWce4ve5aXQ5ahTIzrr+zhV6C+kfpWp755Rzt2JKrXfXwqd14THH8x9uLZwkTAENfVUYtBTF\/0x0lEICp2ThaBNOUCdTL30tlNp\/tVkhIv9OnSlzr8mN+peYp45eRZ07rjLA3TUu9mP1YXB1h3gvBcSPg7sZ34Rghi0Ts\/Jm2uQDTFN5TI7MxxDY94BemHM5b2GHqncSgM+iJJOmC9wLRcC5WY9UwodoUorzS\/Fj\/ebTC50xbKz9f0ptbpCdyrW15i+dZ5zDXqpL8eWQscorQZboHtj72ElALzU3gV6Nq7XQgeWFpkS7OWmWXwo0yowaX0eHyp3D\/iCI6MuHPoQzXZVqFQgxuNVZXdm86UgoMN38Gfg1IoTvhS61VxYC3QCu2duheDjdeUdea1RDinGzfnhYFWk\/h7o5cU+VyUdb79YCCrk2F9Ozkbez4YSP6R3mTqwSBi0bli0PMHs\/TtFRUGhz4ZS6\/XE+Dd9Pl9fXz3uNpgMjHdV7vhxPvgTxioN7RxT\/\/rx48fXw5mv67AXP9dR4J75iLqNOWqet2bkKXX6wvyb+pOh45b4y2Cfk2Xkorjt64HHEWry4hgbr8fEtkN\/rKl7CwfVggLUk0XdwzXl3DL+Y0LPjbk8G3rh9UNA4Oca0jD7mnJz8N4q1OfmSY5E3g271ekPhJ4MkiMecQ6q9\/I3Geforb70JVeehEh4Sdma6k6f\/dDTmAO5j3rE2S0PWWrbbf\/2WYBHBIX\/+LtZW\/EWnxldGXujPWKtG\/etT6c1BNu7fcHz2wrcire22NjKFbBd3B7DmTpQw0TQH8g8X6l28XoMZeqZEi4D\/THMi9MbhW+1Ff\/jQM8\/+9ejDb34HH1cXX1W5QCnYqHSA8pvvT\/N0MvPAZ5l97HsVb2WYsmvUlxOT00PY17NofR8sM4a7WbHVt8VeLApQwb7sFeXGlKI3IlDNMxR8gZvOi+Wi5yWgYztURU6dXnftMak5YIfeu4JPZss1tSLR3llGGVg6q8j1J9R0POh2+9ElUPFehJzNK7K6AuybgcWBu4GHU5PPLaDe\/4neV9JLdxqLV7lDpw\/Cbp72TI+jcmBYGSoOV3XitTuxpWJ5fdXgYP9WnLer9QW6FBdToR+e+b04EcvLX8t8efQr\/1ujvHa1MptgAkNfXfR3Jw5sXt9TFmvXFdoPMEn5k7UEY9nkOGW+a+PmDfBMHN+wHLB8OnyfXlB6Bvz28+QInvRmqDXvPpd5lP0gH5v5v0uyblraxdcBR3F\/AmznjlpZ3Xngf1cxJdARzkX1kLo7u838EbGKC63vcmMy9MthHxbDucqwhn6dPO5kEzk9KvQQ1ymjysWOdhST+b9O+nMZPdcjrUTdPSYQi3c7d1x\/ER3xG66ueSaw8WdyRtCbwLX7XnPHnEBwuUCpg6EjHNvWDUmtCP0XtQpo0lHA9QeWlpuacoOP7RE+rqrOZk3hE7rcoSXrH20I2VucqS5D3KB8qjbk14xdaZ6STjd3ZsGHS+PNKxkfprvgL5fE0CPX226A3WZNN6wIceF\/m0kRejjt+OkEvga6GuG2bHUtTJPoA9u7GK\/yX4\/7sGgb9pXkLLo78RcjlTHAq3bWy4Nad7TdJh4uDDByKW7YNo6PWWX2ROb2lIcQxeMuqskf47iP+2PJ+GoN4kwh6GPy1wUk\/hj9uXd7j1xTpk7MZ8l09bDzoVj9CSQWC958SpD4zJfVnwZ2dJHeFO1qGwCB23C7cu0yYKS9TYPbudTPoVDIvcXaZVNoCT1jgMsQnaeSeGIzMN1vIRTeAfoUmaegT4g83jpNukkjk9dKIU5Mx+QebIsp3ga5Z66w9RXwUHu25j5ot7Q5aKUhi5rhGDqhmSerrPfI5nlODHuli2IMHXZR4USNxzzeQa\/rCCfzloJWoS+nTz+le1R2r8CZbz\/ECbZGEW5pXc7QC+eLZuw87Rv\/4+\/7sNNkv89RlNPZF0OurHfghqvCZddbvnsOr0IfaPtW7uzTn4S7BqBwZxGmaGWI7YRp8Tll9g+u06vQPe3fegTflXPsGjwF5gIcDc9eFq234n56aaeQt\/M2p3MxmVieyqtOG\/sFUn4PtDH07jQbQW+Q6\/FFS9Y5hcEYe0PtwSO7z41NhNuAL38\/QT5BggNut98q8WVfJzNld1iKcTo9tDPbcDvuWWbbHYv15EDjNW2zPZdA4biJxCl8d9Lrn4o5Tz\/u2\/iqEkSYAkdWDwHenPhptAJ0QXN88a4jiDksr39eYd\/L7n+RSTpQfXsGYpfVegDbFDM7VF4a40o9HJ0JF96v7yUgL78Y6dDSnQHhIVgLpzDhZf3CZGIJKVT1AfzfX1I64cdBj0GepdxjVDUucwdDb19tGX910GPnAfXC8W8P3Ty\/PVumScywrb8GfcVh9PtfIKb0+Sh8V65J8Lc2HbcmNPdr4AORMh4b6FP\/knEuo\/6jvtey\/lNdzBCxhyYcaFPjnlMfQjoiM8Wn9Nho5g6z7OKjFskliz0IWZSnN9fa4duWJ5VdOQCKjTkRjD2YaATsGMnS7CU+2YHSd5r6QnzAYz9ptA76hh1598GWDYuvgc7bgldAj3jl0JCPyvHuN4zlMPhSuqodtxZ0+Sw0IVTUroV416oAutSS0cxPwU63iN3ZobR74V7iPcV72CUlB6baEqEbxU8R7ZOZyZHSBdBT+284eJe4tTpIXO49a7QV5GcsKflGOdG\/oNk+uncqOV0UaWeQOdf20\/0GxmDhP5K6lHJSZslJZwWuRuZm1j6de13P8oRS3fGfcxN6vQxqI\/YdGcU7lP8JIO23qfrem1HnE9pxqXQ4WCX+94ntKnLp3WNjzw1btzifX8e8Xi7CEd9kgdvODNmFLqI0NAXSabZsBaNOWu8hXfFXaCTqGfSzJrRPTR0+n1wX3sdBXo7dZM9U9TIzFm+GXMj6BTqUKJNBB31YMyFu9szDVkqMSy9Dn2ElvuhzHpikEDq6z\/m2MM8Gg86P9P25BnkUk9kPFv4XNfcDzOU+H6aY2KZmeyCP7Xn463718A8NvFiVJwPvS\/\/ZJ1w9VteJSZ1cxhRYO5FcWrzph5jmmpS6Frs5mDuvr035ustiTjeuQyJ4hMSV783ybpRdKWXl35CpJu5H6MPfdj3WxKRqBdfvS09YGb5GGNyaz4JtICA68OKKHy3lHA7L6iDPo\/7+mKqKvWlwWezqRgwqUStPpk1XU2ykT3AENzVdN0OEzrFsbeMnvDrx1aoz77Re3k6JvUy9K2JP+9VeDmmo5lsIrv5uDVdwwuSjewBjvKRHOSJnU5g8GT\/tuocGL2fp0NSL0K3J+N+eUVB6Ww+4RlgJykdGDnlN9Pt2q+FwCb6HWOhxwd21PO++fUNfPmfK\/OG6qgfKlD3vuZDfgXkqDmD2tzktp3iU8jb+T8zvJMY0fcoLythoS9Foi3ov0vGw0UwJPKpQD08QW1Pb4GjFly03Bt0mcmfq9ws26ioXpnvkri6KuifHvIKdXeQNKJ1jZDQsY43F3oCm+21N8cYLfemlxALjdSgDkiaKqs+rvaipK0AAACqSURBVKPmsusG0HNpTA7TTT3rkSngyZlq4XhTGZpAT8si29oHrt6\/l77Itd\/uCx360gexVhcdYElKh2h1ULZCc95qsaivkf9hBSXZvKs5SWcoSeWVKQdcNbbEj9v+Ms0kv+noqm+ken4KtK98wJf\/VNP+m\/EqbedPk7xj2oXD6r7QD+pjFE1eCx8w570TLtsXMsxew42Z79SHIL7K9dlBz3yf3m\/z+4sj6P+AUVZxg291\/wAAAABJRU5ErkJggg==";
    actualValue = $("#qunit-fixture img").attr("src");
    message = "Detected data URI as image src.";
  } else {
    expectedValue = "Your browser does not support data URIs and there is no cache URL configured. Cannot display image.";
    actualValue = $("#qunit-fixture").text();
    message = "Detected missing support for data URIs.";
  }
  strictEqual(actualValue, expectedValue, message);
});


test("inject dutchlanguagearea (png, already cached, non async)", function () {
  this.json.url = "/kaart/rest/dlamaptest";
  this.json.cacheurl = "/kaart/cache/dlamap/";
  var expectedValue = this.json.cacheurl + dutchlanguagearea_filename_png;
  $("#qunit-fixture").kaart(this.json);
  strictEqual($("#qunit-fixture img").attr("src"), expectedValue);
});


test("inject dutchlanguagearea (png, not yet cached, non async)", function () {
  this.json.url = "/kaart/rest/dlamaptest";
  this.json.cacheurl = "/kaart/cache/dlamapfail/";
  var expectedValue = this.json.cacheurl + dutchlanguagearea_filename_png;
  $("#qunit-fixture").kaart(this.json);
  strictEqual($("#qunit-fixture img").attr("src"), expectedValue);
});


test("retrieve dutchlanguagearea (png, already cached, non async)", function () {
  this.json.url = "/kaart/rest/dlamaptest";
  this.json.cacheurl = "/kaart/cache/dlamap/";
  var expectedValue, actualValue;
  expectedValue = this.json.cacheurl + dutchlanguagearea_filename_png;
  actualValue = $.fn.kaart('retrieve', this.json);
  strictEqual(actualValue, expectedValue);
});


test("retrieve dutchlanguagearea (png, not yet cached, non async)", function () {
  this.json.url = "/kaart/rest/dlamaptest";
  this.json.cacheurl = "/kaart/cache/dlamapfail/";
  var expectedValue, actualValue;
  var expectedValue = this.json.cacheurl + dutchlanguagearea_filename_png;
  actualValue = $.fn.kaart('retrieve', this.json);
  strictEqual(actualValue, expectedValue);
});

test("retrieve imagemap (non async)", function () {
  this.json.url = "/kaart/rest/imagemaptest";
  this.json.imagemap = 1;
  this.json.data = ["E038p"];
  var actualValue = $.fn.kaart('retrieve', this.json);
//  console.log(actualValue);

  strictEqual(actualValue, expected_imagemap);
});


test("retrieve imagemap (already cached, non async)", function () {

  this.json.url = "/kaart/rest/imagemaptest";
  this.json.cacheurl = "/kaart/cache/imagemap/";
  this.json.imagemap = 1;
  this.json.data = ["E038p"];
  var actualValue = $.fn.kaart('retrieve', this.json);
 // console.log(actualValue);
  strictEqual(actualValue, expected_imagemap);
});



test("retrieve imagemap (not yet cached, non async)", function () {

  this.json.url = "/kaart/rest/imagemaptest";
  this.json.cacheurl = "/kaart/cache/imagemapfail/";
  this.json.imagemap = 1;
  this.json.data = ["E038p"];
  var actualValue = $.fn.kaart('retrieve', this.json);
  // console.log(actualValue);
  strictEqual(actualValue, expected_imagemap);
});

test("inject dutchlanguagearea (svg, non async)", function () {
  this.json.url = "/kaart/rest/svgtest";
  this.json.format = "svg";
  $("#qunit-fixture").kaart(this.json);
  var expectedValue, SVGRoot, actualValue, message;
  if (document.getElementsByTagName('svg').length === 0) {
    actualValue = $("#qunit-fixture").text();
    expectedValue = "Your browser does not support SVG natively.";
    message = "Detected missing browser support for SVG";
  } else {
    SVGRoot = document.getElementsByTagName('svg')[0];
    expectedValue = "svg";
    actualValue = SVGRoot.nodeName;
    message = "Detected svg root element";
  }
  strictEqual(actualValue, expectedValue, message);
});

test("retrieve dutchlanguagearea (kml, non async)", function () {
  this.json.url = "/kaart/rest/kmltest";
  this.json.format = "kml";
  var actualValue, expectedValue;
  actualValue = $.fn.kaart('retrieve', this.json);
  expectedValue = expected_kml;
  strictEqual(stringtoXML(actualValue).documentElement.name, stringtoXML(expectedValue).documentElement.name, "Received " + actualValue);
});

test("create dutchlanguagearea (png, already cached, non async)", function () {
  this.json.cacheurl = "/kaart/cache/dlamapcreate/";
  var expectedValue, actualValue;
  expectedValue = true;
  actualValue = $.fn.kaart('create', this.json);
  strictEqual(actualValue, expectedValue);
});

test("create dutchlanguagearea (png, not yet cached, non async)", function () {
//  this.json.url = "/kaart/rest/dlamaptest";
  this.json.cacheurl = "/kaart/cache/dlamapcreatefail/";
  var expectedValue, actualValue;
  expectedValue = true;
  console.log(this.json);
  actualValue = $.fn.kaart('create', this.json);
  strictEqual(actualValue, expectedValue);
});