

export async function audit_log(user_id,action) {
    try {
        const payload = {
            user_id: user_id,
            action: action,
        };
        await fetch('/api/audit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    } catch (err) {
        console.error('Audit failed:', err);
    }
}


