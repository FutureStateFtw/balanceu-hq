// API.JS
// This store is used for external API definitions
// Contains almost entirely boilerplate code for API endpoints, headers, and URL management.
// They might set a state variable for convenience, but should not obscure any important logic. 
// Put logic in app.js store, not here.

import { defineStore } from 'pinia'

export const useApi = defineStore('api', {
state: () => ({
  
    useLocalAPI:    false,
    localApiUrl:    null,                        
    commonApiUrl:   null,
    prodApiUrl:     null,
    betaApiUrl:     null,

}),

getters: {
    // Default header
    headers: (state) => {
        return {
            'Authorization':    `Bearer ${state.token}`,
            'content-type':     'application/json',
        }
    },
   
},

actions: {   
    // All Fetches go here.  Prefacing the actionName with "fetch" is recommended for clarity.

    // Security Test
    // But it must be added to each backend API to function
    // Sample .NET Return from decoding the claims | return Ok($"Hello {firstName} {lastName} - {netid} - {emplid}.");
    fetchSecurityTest() {
        console.log("Action: Check Secure Endpoint")
        return fetch(this.apiUrl + '/secure', 
            { headers: { ...this.headers, 'content-type': 'application/text' }
        })
        .then(response => response.text())
        .then(data => console.log("Secure Endpoint:", data))
    },
},

})