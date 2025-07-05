export function formatErrors(errors: any): string {
  if (!errors) return 'Erro desconhecido.'
  if (Array.isArray(errors)) {
    return errors.join('\n')
  }
  if (typeof errors === 'object') {
    const messages: string[] = []
    for (const [field, messagesArray] of Object.entries(errors)) {
      const formatted = (messagesArray as string[]).join(', ')
      messages.push(`${field}: ${formatted}`)
    }
    return messages.join('\n')
  }

  return 'Erro inesperado.'
}
