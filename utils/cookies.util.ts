import * as fs from 'fs'

interface Cookie {
    name: string
    value: string
    domain: string
    path: string
    expires: number
    httpOnly: boolean
    secure: boolean
    sameSite: string
}

interface StorageState {
    cookies: Cookie[]
    origins: any[]
}

/**
 * Extract timestamp from WordPress cookie value
 * WordPress cookie value format: username|timestamp|token|hash
 * @param cookieValue 
 * @returns timestamp in seconds or -1 if invalid format
 */
function extractWordPressTimestamp(cookieValue: string): number {
    try {
        const decodedValue = decodeURIComponent(cookieValue)
        const parts = decodedValue.split('|')
        if (parts.length >= 2) {
            const timestamp = parseInt(parts[1])
            return isNaN(timestamp) ? -1 : timestamp
        }
    } catch (error) {
        console.log('Error parsing cookie value:', error)
    }
    return -1
}

/**
 * Check if storage state has valid WordPress session cookies
 * @param storageStatePath Path to the storage state file
 * @returns true if valid cookies exist, false otherwise
 */
export async function hasValidCookies(storageStatePath: string): Promise<boolean> {
    if (!fs.existsSync(storageStatePath)) {
        return false
    }

    try {
        const storageState: StorageState = JSON.parse(fs.readFileSync(storageStatePath, 'utf-8'))
        const cookies = storageState.cookies || []

        // Check if we have any wordpress login cookies
        const loginCookies = cookies.filter(c => c.name.includes('wordpress_logged_in_'))
        if (loginCookies.length === 0) {
            return false
        }

        // Check cookie expiration from the cookie value
        const now = Math.floor(Date.now() / 1000) // Current time in seconds
        return loginCookies.some(cookie => {
            const expiryTimestamp = extractWordPressTimestamp(cookie.value)
            return expiryTimestamp === -1 || expiryTimestamp > now
        })
    } catch (error) {
        console.log('Error reading storage state:', error)
        return false
    }
}
