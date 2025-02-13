#include <stdlib.h>
#include <string.h>
#include <unistd.h>

int main(void) {
  char *s = "  It works!\n";
  write(1, s, strlen(s));
  exit(0);
}
